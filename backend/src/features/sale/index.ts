import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ProductModule } from "../product";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

@Module({
  imports: [ProductModule],
  providers: [SaleService, PrismaService],
  controllers: [SaleController],
})
export class SaleModule {}