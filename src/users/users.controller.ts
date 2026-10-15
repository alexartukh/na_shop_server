import { Controller, Get, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity'

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

  @Get(':id')
  async getSpecificUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    let res = await this.usersService.getSpecificUser(id);
    if (res == null) {
      throw new NotFoundException
    }
    return res
  }
}
