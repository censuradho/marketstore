import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor (private readonly userService: UserService) {}

  async login () {}
}