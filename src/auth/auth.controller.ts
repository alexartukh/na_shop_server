import { Controller, Post, Get, Body, HttpCode, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MyAuthGuard } from './auth.guard';
import type { JwtPayload } from './jwt-payload';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(dto.email, dto.password);
  }

  // кто я — содержимое токена
  @Get('me')
  @UseGuards(MyAuthGuard)
  me(@Req() request: Request): JwtPayload {
    // request.user положил MyAuthGuard
    return request['user'];
  }
}
