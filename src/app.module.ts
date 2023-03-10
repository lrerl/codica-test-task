import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BankModule} from './bank/bank.module';
import {ConfigModule} from "@nestjs/config";
import { TransactionsModule } from './transactions/transactions.module';
import { CategoryModule } from './category/category.module';
import {Transaction} from "./transactions/transactions.entity";
import {Bank} from "./bank/bank.entity";
import {Category} from "./category/category.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Transaction, Bank, Category],
            synchronize: true
        }),
        BankModule,
        TransactionsModule,
        CategoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
