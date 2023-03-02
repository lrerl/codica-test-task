import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity('banks')
export class Bank {

    @ApiProperty({example: 1, description: "Unique identificator"})
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ApiProperty({example: "Sber24", description: "Unique name of bank"})
    @Column({type: 'varchar', length: 255, nullable: false })
    name: string;

    @ApiProperty({example: 50000, description: "Balance of bank"})
    @Column({type: 'int', nullable: false})
    balance: number;

    @OneToMany(type => Transaction, transaction => transaction.bank)
    transactions: Transaction[];
}
