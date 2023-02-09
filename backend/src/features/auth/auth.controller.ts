import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create";
import { AuthService } from "./auth.service";
import { IsPublic } from "./decorators/is-public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequest } from "./models/auth-request";

@Controller('auth')
export class AuthController {
  constructor (private readonly service: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Request() request: AuthRequest) {
    return await this.service.login(request.user)
  }

  @IsPublic()
  @Post('sign-up')
  async SignUp (@Body() body: CreateUserDto) {
    return await this.service.SignUp(body)
  }
}
