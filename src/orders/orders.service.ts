import { Injectable } from '@nestjs/common';
import { Order } from './order.entity'
import { OrderItem } from './order-item.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    private readonly ordersRepository: Repository<Order>
    private readonly orderItemsRepository: Repository<OrderItem>

    constructor(
        @InjectRepository(Order) ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem) orderItemsRepository: Repository<OrderItem>,
    ) {
        this.ordersRepository = ordersRepository
        this.orderItemsRepository = orderItemsRepository
    }

    // только заказы этого пользователя
    async getAllOrders(userId: number): Promise<Order[]> {
        return this.ordersRepository.find({ where: { user_id: String(userId) } })
    }

    // чужой заказ не найдётся → null → 404
    async getSpecificOrder(id: number, userId: number): Promise<Order | null> {
        return this.ordersRepository.findOne({ where: { id, user_id: String(userId) } })
    }

    // позиции заказа вместе с товарами; null — если заказ не найден или чужой
    async getOrderItems(orderId: number, userId: number): Promise<OrderItem[] | null> {
        const order = await this.getSpecificOrder(orderId, userId)
        if (order == null) {
            return null
        }
        return this.orderItemsRepository.find({
            where: { order_id: String(orderId) },
            relations: { product: true },
        })
    }
}
