import {ApiProperty} from "@nestjs/swagger";

export class BankDeleteDto {

    @ApiProperty({example: "Monobank", description: 'Name or id of bank'})
    readonly value: string;
}