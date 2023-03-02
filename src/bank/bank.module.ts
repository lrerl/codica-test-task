import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './bank.entity';

@Module({
  providers: [BankService],
  controllers: [BankController],
  imports: [TypeOrmModule.forFeature([Bank])],
})
export class BankModule {}
