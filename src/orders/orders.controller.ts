import { Controller, Get, Param, Req, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity'
import { MyAuthGuard } from '../auth/auth.guard';
import type { Request } from 'express'

@Controller('orders')
@UseGuards(MyAuthGuard)
export class OrdersController {
  private readonly ordersService: OrdersService;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  @Get('')
  async getAllOrders(@Req() request: Request): Promise<Order[]> {
    const userId = request['user'].sub;
    return this.ordersService.getAllOrders(userId);
  }

  @Get(':orderId')
  async getSpecificOrder(@Param('orderId', ParseIntPipe) orderId: number, @Req() request: Request): Promise<Order | null> {
    const userId = request['user'].sub;
    let res = await this.ordersService.getSpecificOrder(orderId, userId);
    if (res == null) {
      throw new NotFoundException
    }
    return res
  }
}
