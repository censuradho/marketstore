
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { CreateProductDto } from ".";
import { Sale } from "../../model/sale";

export class CreateSaleDto implements Sale {
  @IsString()
  category_id: string;
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

  id: string;
  active: boolean;
  saller_id: string;
  created_at: Date;
  updated_at: Date;
}