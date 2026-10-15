import { Controller, Get, Post, Body, Param, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity'
import { CreateProductDto } from './dto/create-product.dto';
import { MyAuthGuard } from '../auth/auth.guard'

@Controller('products')
export class ProductsController {
  private readonly productsService: ProductsService;

  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Get('')
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getSpecificProduct(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
    let res = await this.productsService.getSpecificProduct(id);
    if (res == null) {
      throw new NotFoundException
    }
    return res
  }

  @Post()
  @UseGuards(MyAuthGuard)
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }
}
