import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "./product.service";

@Module({
  providers: [PrismaService],
  exports: [ProductService]
})
export class ProductModule {}