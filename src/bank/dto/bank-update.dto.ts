import {ApiProperty} from "@nestjs/swagger";

export class BankUpdateDto {

    @ApiProperty({example: 1, description: 'ID of bank'})
    readonly id: number;

    @ApiProperty({example: 50000, description: 'Updated balance of bank'})
    readonly updatedBalance: number;
}