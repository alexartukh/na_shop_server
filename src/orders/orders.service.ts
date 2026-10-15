import { Injectable } from '@nestjs/common';
import { Order } from './order.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    private readonly ordersRepository: Repository<Order>

    constructor(@InjectRepository(Order) ordersRepository: Repository<Order>) {
        this.ordersRepository = ordersRepository
    }

    // только заказы этого пользователя
    async getAllOrders(userId: number): Promise<Order[]> {
        return this.ordersRepository.find({ where: { user_id: String(userId) } })
    }

    // чужой заказ не найдётся → null → 404
    async getSpecificOrder(id: number, userId: number): Promise<Order | null> {
        return this.ordersRepository.findOne({ where: { id, user_id: String(userId) } })
    }
}