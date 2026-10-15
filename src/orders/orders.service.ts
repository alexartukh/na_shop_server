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

    async getAllOrders(): Promise<Order[]> {
        return this.ordersRepository.find()
    }

    async getSpecificOrder(id: number): Promise<Order | null> {
        return this.ordersRepository.findOne({ where: { id } })
    }
}