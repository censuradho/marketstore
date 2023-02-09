import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { randomUUID } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { AuthRequest } from "../auth/models";
import { CreateSaleDto } from "./dto/create-sale.dto";

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: AuthRequest
  ) {}

  async create (payload: CreateSaleDto) {

    await this.prisma.sale.create({
      data: {
        id: randomUUID(),
        category: {
          connect: {
            id: payload.category_id
          }
        },  
        products: {
          createMany: {
            data: payload.products.map(product => ({
              id: randomUUID(),
              condition: product.condition,
              description: product?.description,
              name: product.name,
              price: product.price,
            }))
          }
        },
        saller: {
          connect: {
            id: this.request.user.id
          }
        }
      }
    })
  }
}