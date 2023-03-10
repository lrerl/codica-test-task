import {Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, ParseIntPipe, Post, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Transaction} from "./transactions.entity";
import {TransactionsService} from "./transactions.service";
import {TransactionCreateDto} from "./dto/transaction-create.dto";
import {TransactionDeleteDto} from "./dto/transaction-delete.dto";
import {HttpService} from "@nestjs/axios";
import {Pagination} from "nestjs-typeorm-paginate";


@ApiTags('Transactions controller')
@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService,
                private httpService: HttpService) {
    }

    @ApiOperation({summary: "Create a new transaction"})
    @ApiResponse({status: 200, type: Transaction})
    @Post()
    createTransaction(@Body() dto: TransactionCreateDto) {
        const transaction = this.transactionsService.createTransaction(dto);
        this.httpService
            .post(process.env.TRANSACTION_WEBHOOK_URL, dto)
            .subscribe({
                complete: () => {
                    console.log('completed');
                },
                error: (err) => {
                    // you can handle error requests here
                },
            });
        return transaction;

    }

    @ApiOperation({summary: "Delete transaction by ID"})
    @ApiResponse({status: 200, type: Transaction})
    @Delete()
    cancelTransaction(dto: TransactionDeleteDto) {
        return this.transactionsService.deleteTransaction(dto);
    }

    @ApiOperation({summary: "Get all transactions (pagination)"})
    @ApiResponse({status: 200, type: Transaction})
    @Get()
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Transaction>> {
        limit = limit > 100 ? 100 : limit;
        return this.transactionsService.paginate({
            page,
            limit,
            route: '/transactions',
        });
    }


}
