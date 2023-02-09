import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Condition, Product } from "../model/product";

export class CreateProductDto implements Product {
  id: string
  created_at: Date;
  updated_at: Date;
  sold: boolean;

  @IsString()
  sale_id: string;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsEnum(Condition)
  condition: Condition;
}