import { IsString } from "class-validator";

export class FileUploadDto {
  @IsString()
  productId: string
}