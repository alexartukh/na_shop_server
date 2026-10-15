import { Injectable } from '@nestjs/common';
import { Product } from './product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
    private readonly productsRepository: Repository<Product>

    constructor(@InjectRepository(Product) productsRepository: Repository<Product>) {
        this.productsRepository = productsRepository
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productsRepository.find()
    }

    async getSpecificProduct(id: number): Promise<Product | null> {
        return this.productsRepository.findOne({ where: { id } })
    }

    async create( dto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create({
            name: dto.name,
            description: dto.description,
            price: String(dto.price)
        });
        return this.productsRepository.save(product);
    }
}