import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { randomUUID } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { AuthRequest } from "../auth/models";
import { CreateProductDto } from "./dto/create";

@Injectable()
export class ProductService {
  constructor (
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: AuthRequest
  ) {}

  async create (payload: CreateProductDto) {
    const {
      condition,
      description,
      price,
      name,
      sale_id
    } = payload

    await this.prisma.product.create({
      data: {
        id: randomUUID(),
        sold: false,
        condition,
        description,
        price,
        name,
        sale: {
          connect: {
            id: sale_id
          }
        }
      }
    })
  }
}