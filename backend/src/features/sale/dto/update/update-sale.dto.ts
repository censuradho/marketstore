import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { CreateSaleDto } from "../create";
import { UpdateProductDto } from "./update-product.dto";

export class UpdateSaleDto extends CreateSaleDto {
  @IsString()
  id: string
  
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDto)
  products: UpdateProductDto[]
}