import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Transaction} from "../transactions/transactions.entity";

@Entity('categories')
export class Category {

    @ApiProperty({example: 1, description: 'Unique identificator'})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @ApiProperty({example: "Payday", description: 'Unique name of category'})
    @Column({type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @ApiProperty({example: "+5000", description: 'Amount of money spent or received within the category'})
    @Column({type: 'int', nullable: false, default: 0})
    amount: number;

    @ApiProperty({example: '02.03.2023 AT 15:00', description: 'Date of updating category amount'})
    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: Date;
}