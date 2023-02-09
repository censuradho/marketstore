import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Condition, Product } from "../model/product";

export class CreateProductDto implements Product {
  id: string
  @IsOptional()
  @IsString()
  description: string;
  sold: boolean;
  @IsNumber()
  price: number;
  @IsEnum(Condition)
  condition: Condition;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  active: boolean;
}