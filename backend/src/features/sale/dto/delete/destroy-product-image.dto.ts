import { IsString } from "class-validator";

export class DestroyProductImageDto {
  @IsString({ each: true })
  ids: string[]
}