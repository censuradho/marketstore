import { Module } from "@nestjs/common/decorators";
import { PrismaService } from "src/database/prisma.service";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService]
})
export class CategoryModule {}