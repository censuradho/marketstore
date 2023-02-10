import { IsString } from "class-validator";

export class FileUploadDto {
  @IsString({ each: true })
  productsId: string[]
}