import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { SaleService } from "./sale.service";

@Controller('sale')
export class SaleController {
  constructor (private readonly service: SaleService) {}

  @Post()
  async create (@Body() body: CreateSaleDto) {
    await this.service.create(body)
  }
  
  @Get()
  async findMany () {
    return await this.service.findMany()
  }

  @Get('/all')
  async findAll () {
    return await this.service.findAll()
  }

  @Patch(':id')
  async sell (@Param('id') id: string) {
    await this.service.sell(id)
  }
}