import {ApiProperty} from "@nestjs/swagger";

export class CategoryCreateDto {
    @ApiProperty({example: 'Payday', description: 'Category name'})
    readonly name: string;
}