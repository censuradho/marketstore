import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateSaleDto } from "./dto/create";
import { UpdateSaleDto } from "./dto/update";
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

  @Patch(':id/active-toggle')
  async toggleActive (@Param('id') id: string) {
    await this.service.toggleActive(id)
  }

  @Put(':id')
  async update (@Body() body: CreateSaleDto, @Param('id') id: string) {
    await this.service.update({
      ...body,
      id
    })
  }
}