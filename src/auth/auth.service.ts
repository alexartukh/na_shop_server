import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import type { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    private readonly usersService: UsersService
    private readonly jwtService: JwtService

    constructor(usersService: UsersService, jwtService: JwtService) {
        this.usersService = usersService
        this.jwtService = jwtService
    }

    async login(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findByEmailWithPassword(email)

        // одно сообщение для неверного email и пароля — защита от перебора email (user enumeration)
        if (!user || !(await bcrypt.compare(password, user.encrypted_password))) {
            throw new UnauthorizedException('Invalid email or password')
        }

        // id из Postgres (bigint) приходит строкой — в токене храним число
        const payload: JwtPayload = { sub: Number(user.id), role: user.role }
        return { accessToken: await this.jwtService.signAsync(payload) }
    }
}
