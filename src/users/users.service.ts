import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
        
    }

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async getSpecificUser(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } })
    }
}