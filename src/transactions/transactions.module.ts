import {Module} from '@nestjs/common';
import {TransactionsController} from './transactions.controller';
import {TransactionsService} from './transactions.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./transactions.entity";
import {Bank} from "../bank/bank.entity";
import {BankModule} from "../bank/bank.module";
import {CategoryModule} from "../category/category.module";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, Bank]),
        BankModule,
        CategoryModule,
        HttpModule
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {
}
