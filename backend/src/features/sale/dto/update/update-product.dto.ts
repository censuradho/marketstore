import { IsString } from "class-validator";
import { CreateProductDto } from "../create";

export class UpdateProductDto extends CreateProductDto {
  @IsString()
  id: string
}