import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly usersRepository: Repository<User>

    constructor(@InjectRepository(User) usersRepository: Repository<User>) {
        this.usersRepository = usersRepository
    }

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async getSpecificUser(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } })
    }

    async findByEmailWithPassword(email:string): Promise<User | null> {
        return this.usersRepository
            .createQueryBuilder('u')
            .addSelect('u.encrypted_password')
            .where('u.email = :email', { email: email.toLowerCase() })
            .getOne()
    }
}