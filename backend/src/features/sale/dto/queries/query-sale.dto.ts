import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator"


enum order {
  asc = 'asc',
  desc = 'desc'
}

export class QuerySaleDto {
  @IsOptional()
  @IsString()
  condition: string

  @IsOptional()
  @IsEnum(order)
  order: order

  @IsOptional()
  @IsBoolean()
  active: boolean
}