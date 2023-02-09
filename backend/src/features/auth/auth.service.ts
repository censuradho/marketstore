import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt'
import { User } from "../user/model/user";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "./models/user-payload";

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login (user: User) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user)
      throw new UnauthorizedException({
        description: 'EMAIL_PASSWORD_INCORRECT',
      })

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword)
      throw new UnauthorizedException({
        description: 'EMAIL_PASSWORD_INCORRECT',
      })

    return {
      ...user,
      password: undefined,
    }
  }
}