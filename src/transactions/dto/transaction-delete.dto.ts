import {ApiProperty} from "@nestjs/swagger";

export class TransactionDeleteDto {

    @ApiProperty({example: '1', description: 'ID of transaction'})
    readonly id: number;
}