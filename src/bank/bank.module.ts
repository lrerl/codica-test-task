import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './bank.entity';
import {Transaction} from "../transactions/transactions.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bank, Transaction])],
  providers: [BankService],
  controllers: [BankController],
  exports: [BankService]
})
export class BankModule {}
