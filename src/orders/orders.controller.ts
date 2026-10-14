import { Controller, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getSpecificOrder(@Param('id', ParseIntPipe) id: number): Promise<Order | null> {
    let res = await this.ordersService.getSpecificOrder(id);
    if (res == null) {
      throw new NotFoundException
    }
    return res
  }
}
