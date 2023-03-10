import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Bank} from "./bank.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BankCreateDto} from "./dto/bank-create.dto";
import {BankUpdateDto} from "./dto/bank-update.dto";
import {BankDeleteDto} from "./dto/bank-delete.dto";

@Injectable()
export class BankService {

    constructor(@InjectRepository(Bank) private bankRepository: Repository<Bank>) {}

    async createBank(dto: BankCreateDto) {
        const bank =  await this.bankRepository.create(dto);
        return await this.bankRepository.save(bank);
    }

    async getAll(): Promise<Bank[]> {
        return await this.bankRepository.find();
    }

    async getOneById(id: number): Promise<Bank> {
        const bank = await this.bankRepository.findOneBy({ id });
        return await this.checkBankIfPresent(bank);
    }

    async getOneByName(name: string): Promise<Bank> {
        const bank = await this.bankRepository.findOneBy({ name });
        return await this.checkBankIfPresent(bank);
    }

    async updateBalance(dto: BankUpdateDto) {
        const id = dto.id;
        const bank = await this.bankRepository.findOneBy({ id });
        await this.checkBankIfPresent(bank);
        bank.balance = dto.updatedBalance;
        return await this.bankRepository.save(bank);
    }

    async deleteBank(dto: BankDeleteDto) {
        const name = dto.value
        const bank = await this.bankRepository.findOneBy({ name });
        await this.checkBankIfPresent(bank);
        try {
            return await this.bankRepository.remove(bank);
        } catch(e) {
            throw new HttpException("Bank cannot be removed, because he still has a transactions", HttpStatus.NOT_ACCEPTABLE);
        }

    }

    private async checkBankIfPresent(bank: Bank) {
        if(bank)
            return bank;
        else
            throw new HttpException(`Bank not found`, HttpStatus.NOT_FOUND);
    }


}
