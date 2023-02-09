import { Body, Controller, Post } from "@nestjs/common";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { SaleService } from "./sale.service";

@Controller('sale')
export class SaleController {
  constructor (private readonly service: SaleService) {}

  @Post()
  async create (@Body() body: CreateSaleDto) {
    await this.service.create(body)
  }
}