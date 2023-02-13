import { Body, Controller, Get, Param, Patch, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { IsPublic } from "../auth/decorators";
import { CreateSaleDto } from "./dto/create";
import { FileUploadDto } from "./dto/create/file-upload.dto";
import { DestroyProductImageDto } from "./dto/delete/destroy-product-image.dto";
import { SaleService } from "./sale.service";

@Controller('sale')
export class SaleController {
  constructor (
    private readonly service: SaleService,

  ) {}

  @Post()
  async create (@Body() body: CreateSaleDto) {
    await this.service.create(body)
  }
  
  @Get()
  async findMany () {
    return await this.service.findMany()
  }

  @IsPublic()
  @Get('all')
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

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() productsId: FileUploadDto) {
    return this.service.createProductImages(files, productsId)
  }

  @Put('/product/images/destroy')
  async destroyProductImage (@Body() body: DestroyProductImageDto) {
    return await this.service.destroyProductImage(body)
  }
}