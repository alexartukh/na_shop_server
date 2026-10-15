import { Controller, Get, Param, Req, NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { User } from './user.entity'
import { MyAuthGuard } from '../auth/auth.guard';

@UseGuards(MyAuthGuard)
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get('')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // 'me' стоит выше ':id' — иначе /users/me попадёт в ':id'
  @Get('me')
  async me(@Req() request: Request): Promise<User | null> {
    return this.usersService.getSpecificUser(request['user'].sub);
  }

  @Get(':id')
  async getSpecificUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    let res = await this.usersService.getSpecificUser(id);
    if (res == null) {
      throw new NotFoundException
    }
    return res
  }
}
