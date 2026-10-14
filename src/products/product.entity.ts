import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: string;
}
