import {ApiProperty} from "@nestjs/swagger";

export class TransactionCreateDto {
    @ApiProperty({example: "consumable", description: "Type of transaction (Profitable || Consumable)"})
    readonly type: string;

    @ApiProperty({example: 500, description: 'Transaction value'})
    readonly amount: number;

    @ApiProperty({example: "1", description: 'Bank ID'})
    readonly bankId: number;

    @ApiProperty({example: "[1, 2, 4]", description: 'Categories IDs'})
    readonly categoriesIds: number[];
}