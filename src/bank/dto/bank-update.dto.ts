import {ApiProperty} from "@nestjs/swagger";

export class BankUpdateDto {

    constructor(id, updatedBalance) {
        this.id = id;
        this.updatedBalance = updatedBalance;
    }

    @ApiProperty({example: 1, description: 'ID of bank'})
    id: number;

    @ApiProperty({example: 50000, description: 'Updated balance of bank'})
    updatedBalance: number;
}