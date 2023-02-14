import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsEmail()
  email: string;
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  password: string;
}