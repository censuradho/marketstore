import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { CreateSaleDto } from "../create";
import { UpdateProductDto } from "./update-product.dto";

export class UpdateSaleDto extends CreateSaleDto {
  @IsString()
  id: string
  
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDto)
  product: UpdateProductDto
}