import { Inject, Injectable, NotFoundException } from "@nestjs/common";
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

  async findMany () {
    return await this.prisma.sale.findMany({
      where: {
        saller_id: this.request.user.id
      }
    })
  }

  async sell (id: string) {
    const announcement = await this.prisma.sale.findMany({
      where: {
        AND: [
          {
            id,
          },
          {
            saller_id: this.request.user.id
          }
        ]
      },
      include: {
        products: {
          select: {
            id: true
          }
        }
      } 
    })

    if (!announcement) throw new NotFoundException({
      description: 'SALE_NOT_FOUND'
    })

    await this.prisma.sale.update({
      where: {
        id
      },
      data: {
        active: false,
        products: {
          updateMany: {
            where: {},
            data: {
              sold: true
            }
          }
        }
      }
    })
  }

  async findAll () {
    const sales = await this.prisma.sale.findMany({
      include: {
        category: true,
        products: true,
        saller: {
          select: {
            email: true,
            username: true,
            id: true
          }
        }
      }
    })

    return sales
  }
}