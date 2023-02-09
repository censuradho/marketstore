import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create';
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    const {
      email,
      first_name,
      last_name,
      password,
    } = payload

    const userExist = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userExist) throw new ForbiddenException({
      message: 'USER_ALREADY_EXIST',
    })

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        first_name,
        last_name,
        username: `${first_name} ${last_name}`,
        password: passwordHash
      }
    })

    return {
      ...user,
      password: undefined
    }
  }

  async findByEmail (email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
