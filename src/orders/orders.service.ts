import { Injectable } from '@nestjs/common';
import { Order } from './order.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
    ) {
        
    }

    async getAllOrders(): Promise<Order[]> {
        return this.ordersRepository.find()
    }

    async getSpecificOrder(id: number): Promise<Order | null> {
        return this.ordersRepository.findOne({ where: { id } })
    }
}