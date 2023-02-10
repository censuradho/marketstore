import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

@Module({
  imports: [CloudinaryModule],
  providers: [SaleService, PrismaService],
  controllers: [SaleController],
})
export class SaleModule {}