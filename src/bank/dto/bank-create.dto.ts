import {ApiProperty} from "@nestjs/swagger";

export class BankCreateDto {
    @ApiProperty({example: 'Sber24', description: 'Unique name of bank'})
    readonly name: string;

    @ApiProperty({example: 20000, description: 'Balance of bank'})
    readonly balance: number;
}