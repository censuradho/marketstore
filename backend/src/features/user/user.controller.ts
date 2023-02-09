import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.service.create(body);
  }
}
