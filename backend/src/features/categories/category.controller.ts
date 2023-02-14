import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist";
import { IsPublic } from "../auth/decorators";
import { CategoryService } from "./category.service";
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor (private readonly service: CategoryService) {}

  @IsPublic()
  @Get()
  async findMany () {
    return await this.service.findMany()
  }
}