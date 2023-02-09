import { IsString } from "class-validator";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { User } from "../model/user";

export class CreateUserDto implements User {
  id: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  username: string;
  @IsEmail()
  email: string;
  @MaxLength(20)
  @MinLength(8)
  @IsString()
  password: string;
  created_at: string;
  updated_at: string;

}