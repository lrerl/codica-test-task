import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Transaction} from "./transactions.entity";
import {TransactionCreateDto} from "./dto/transaction-create.dto";
import {TransactionDeleteDto} from "./dto/transaction-delete.dto";
import {BankService} from "../bank/bank.service";
import {CategoryService} from "../category/category.service";
import {BankUpdateDto} from "../bank/dto/bank-update.dto";
import {Category} from "../category/category.entity";
import {CategoryUpdateDto} from "../category/dto/category-update.dto";
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TransactionsService {

    constructor(@InjectRepository(Transaction) private transactionsRepository: Repository<Transaction>,
                private bankService: BankService,
                private categoryService: CategoryService) {
    }

    private async getAllCategoriesByIds(ids: number[]): Promise<Category[]> {
        let result = [];
        let tempCategory;
        for (let i = 0; i < ids.length; i++) {
            tempCategory = await this.categoryService.getOneById(ids[i]);
            if (tempCategory)
                result.push(tempCategory);
            else
                throw new HttpException('Categories does not exist', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async createTransaction(dto: TransactionCreateDto) {
        let transaction = await this.transactionsRepository.create(dto);
        let bank = await this.bankService.getOneById(dto.bankId);
        let categories = await this.getAllCategoriesByIds(dto.categoriesIds)

        if (bank && categories && categories.length > 0) {
            let bankUpdatedBalance;
            let categoryUpdatedBalance;
            if (transaction.type == 'CONSUMABLE') {
                bankUpdatedBalance = bank.balance - dto.amount;
                if (bankUpdatedBalance < 0)
                    throw new HttpException('Amount can\'t be less than 0', HttpStatus.NOT_ACCEPTABLE);


                for (let i = 0; i < categories.length; i++) {
                    const tempCategory = categories[i];
                    categoryUpdatedBalance = tempCategory.amount - dto.amount;
                    await this.categoryService.updateCategory(
                        new CategoryUpdateDto(
                            tempCategory.id,
                            tempCategory.name,
                            categoryUpdatedBalance));
                }
            } else if (transaction.type == 'PROFITABLE') {
                bankUpdatedBalance = bank.balance + dto.amount;

                for (let i = 0; i < categories.length; i++) {
                    const tempCategory = categories[i];
                    categoryUpdatedBalance = tempCategory.amount + dto.amount;
                    await this.categoryService.updateCategory(
                        new CategoryUpdateDto(
                            tempCategory.id,
                            tempCategory.name,
                            categoryUpdatedBalance));
                }
            } else {
                throw new HttpException('Transaction type can be only PROFITABLE or CONSUMABLE', HttpStatus.BAD_REQUEST);
            }
            await this.bankService.updateBalance(new BankUpdateDto(bank.id, bankUpdatedBalance));
            transaction.bank = bank;
            transaction.categories = categories;
            await this.transactionsRepository.save(transaction);
            return transaction;
        }
        throw new HttpException('Bank or categories does not exist', HttpStatus.NOT_FOUND);
    }

    async deleteTransaction(dto: TransactionDeleteDto) {
        const id = dto.id;
        const transaction = await this.transactionsRepository.findOneBy({id})
        return await this.transactionsRepository.remove(transaction);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Transaction>> {
        const queryBuilder = this.transactionsRepository.createQueryBuilder('t');
        queryBuilder.orderBy('t.id', 'DESC');
        return paginate<Transaction>(this.transactionsRepository, options);
    }
}
