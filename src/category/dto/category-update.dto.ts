import {ApiProperty} from "@nestjs/swagger";

export class CategoryUpdateDto {

    constructor(id: number, name: string, amount: number) {
        this.id = id;
        this.name = name;
        this.amount = amount;
    }

    @ApiProperty({example: 1, description: 'Unique identificator'})
    id: number;

    @ApiProperty({example: 'Payday', description: 'Category name'})
    name: string;

    @ApiProperty({example: "5000", description: 'Amount of money spent or received within the category'})
    amount: number;
}