import {ApiProperty} from "@nestjs/swagger";

export class CategoryDeleteDto {

    @ApiProperty({example: '1', description: 'Category name or id'})
    readonly value: string;
}