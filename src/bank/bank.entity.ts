import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Transaction} from "../transactions/transactions.entity";


@Entity('banks')
export class Bank {

    @ApiProperty({example: 1, description: "Unique identificator"})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({example: "Sber24", description: "Unique name of bank"})
    @Column({type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @ApiProperty({example: 50000, description: "Balance of bank"})
    @Column({type: 'int', nullable: false})
    balance: number;

    @OneToMany(type => Transaction, transactions => transactions.bank)
    transactions: Transaction[];

}
