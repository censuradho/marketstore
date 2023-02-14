
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { CreateProductDto } from ".";
import { Sale } from "../../model/sale";

export class CreateSaleDto {
  @IsString()
  category_id: string;
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  product: CreateProductDto;
}