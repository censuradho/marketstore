import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { ProductService } from "../product/product.service";

@Injectable()
export class SaleService {
  constructor(
    private readonly productService: ProductService,
    private readonly prisma: PrismaService
  ) {}
}