import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

// позиция заказа: какой товар и сколько штук
@Entity('orders_description')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    order_id!: string;

    @Column()
    quantity!: number;

    // колонка item_id ссылается на товар — TypeORM подтянет его целиком
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'item_id' })
    product!: Product;
}
