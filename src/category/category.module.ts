import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "../transactions/transactions.entity";
import {Category} from "./category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Transaction])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
