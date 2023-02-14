import { IsEnum, IsNumber, IsString } from "class-validator";
import { Condition } from "../../model/product";
export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsEnum(Condition)
  condition: Condition;
}