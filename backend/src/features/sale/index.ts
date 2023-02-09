import { Module } from "@nestjs/common";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

@Module({
  providers: [SaleService],
  controllers: [SaleController],
})
export class SeleModule {}