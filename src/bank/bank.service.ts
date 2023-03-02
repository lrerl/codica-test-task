import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Bank} from "./bank.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {BankCreateDto} from "./dto/bank-create.dto";
import {BankUpdateDto} from "./dto/bank-update.dto";

@Injectable()
export class BankService {

    constructor(@InjectRepository(Bank) private bankRepository: Repository<Bank>) {}

    async createBank(dto: BankCreateDto) {
        return await this.bankRepository.save(dto);
    }

    async getAll(): Promise<Bank[]> {
        return await this.bankRepository.find();
    }

    async getOneById(id: number): Promise<Bank> {
        return await this.bankRepository.findOneBy({ id });
    }

    async getOneByName(name: string): Promise<Bank> {
        return await this.bankRepository.findOneBy({ name });
    }

    async updateBalance(dto: BankUpdateDto) {
        const id = dto.id;
        const bank = await this.bankRepository.findOneBy({ id });
        if(bank) {
            bank.balance = dto.updatedBalance;
            return await this.bankRepository.save(bank);
        }
        throw new HttpException(`Bank with ID = ${id} not founded`, HttpStatus.NOT_FOUND);
    }


}
