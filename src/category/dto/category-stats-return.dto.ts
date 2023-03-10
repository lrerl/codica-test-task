import {ApiProperty} from "@nestjs/swagger";

export class CategoryStatsReturnDto {

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    @ApiProperty({example: "Something", description: 'Category name'})
    name: string;

    @ApiProperty({example: "20000", description: 'Amount of money spent or received within the category'})
    amount: number;
}