import {ApiProperty} from "@nestjs/swagger";

export class CategoryStatsDto {

    @ApiProperty({example: "[1, 2, 4]", description: 'Categories IDs'})
    readonly categoriesIds: number[];

    @ApiProperty({example: "07-03-2023", description: 'From period'})
    readonly fromPeriod: Date;

    @ApiProperty({example: "08-03-2023", description: 'To period'})
    readonly toPeriod: Date;
}