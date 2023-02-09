import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

@Module({
  providers: [SaleService, PrismaService],
  controllers: [SaleController],
})
export class SaleModule {}