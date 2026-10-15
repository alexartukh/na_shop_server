import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

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

        const payload = { sub: user.id, role: user.role }
        return { accessToken: await this.jwtService.signAsync(payload) }
    }
}
