
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { CreateProductDto } from ".";
import { Sale } from "../../model/sale";

export class CreateSaleDto implements Sale {
  @IsString()
  category_id: string;
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  id: string;
  active: boolean;
  saller_id: string;
  created_at: Date;
  updated_at: Date;
}