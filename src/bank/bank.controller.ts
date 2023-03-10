import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {BankService} from "./bank.service";
import {BankCreateDto} from "./dto/bank-create.dto";
import {BankUpdateDto} from "./dto/bank-update.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Bank} from "./bank.entity";
import {BankDeleteDto} from "./dto/bank-delete.dto";

@ApiTags("Banks controller")
@Controller('banks')
export class BankController {

    constructor(private bankService: BankService) {}

    @ApiOperation({summary: "Get all banks"})
    @ApiResponse({status: 200, type: Bank})
    @Get()
    getAllBanks() {
        return this.bankService.getAll();
    }

    @ApiOperation({summary: "Get one bank by ID"})
    @ApiResponse({status: 200, type: Bank})
    @Get(`id/:id`)
    getOneBankById(@Param('id') id: number) {
        return this.bankService.getOneById(id);
    }

    @ApiOperation({summary: "Get one bank by name"})
    @ApiResponse({status: 200, type: Bank})
    @Get('name/:name')
    getOneBankByName(@Param('name') name: string) {
        return this.bankService.getOneByName(name);
    }

    @ApiOperation({summary: "Create a new bank"})
    @ApiResponse({status: 200, type: Bank})
    @Post()
    createBank(@Body() dto: BankCreateDto) {
        return this.bankService.createBank(dto);
    }

    @ApiOperation({summary: "Update balance for created bank"})
    @ApiResponse({status: 200, type: Bank})
    @Put()
    updateBank(@Body() dto: BankUpdateDto) {
        return this.bankService.updateBalance(dto);
    }

    @ApiOperation({summary: "Delete bank"})
    @ApiResponse({status: 200})
    @Delete('/delete')
    deleteBank(@Body() dto: BankDeleteDto) {
        return this.bankService.deleteBank(dto);
    }


}
