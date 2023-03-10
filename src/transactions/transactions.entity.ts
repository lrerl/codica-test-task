import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable, ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Bank} from "../bank/bank.entity";
import {Category} from "../category/category.entity";

@Entity('transactions')
export class Transaction {

    @ApiProperty({example: 1, description: "Unique identificator"})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({example: "consumable", description: "Type of transaction (Profitable || Consumable)"})
    @Column({type: 'varchar', length: 255, nullable: false })
    type: string;

    @ApiProperty({example: 50000, description: "Sum of transaction"})
    @Column({type: 'int', nullable: false})
    amount: number;

    @ManyToOne(type => Bank)
    bank: Bank;

    @ManyToMany(type => Category)
    @JoinTable({ name: 'transactions_categories' })
    categories: Category[];

    @ApiProperty({example: '02.03.2023 AT 15:00', description: "Date of creating transaction"})
    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createdAt: Date;

}
