import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { randomUUID } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { AuthRequest } from "../auth/models";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateSaleDto } from "./dto/create";
import { FileUploadDto } from "./dto/create/file-upload.dto";
import { QuerySaleDto } from "./dto/queries/query-sale.dto";
import { UpdateSaleDto } from "./dto/update";

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
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

  async findMany (query?: QuerySaleDto) {
    const { 
      active = true, 
      condition = 'new', 
      order = 'desc' 
    } = query || {}

    return await this.prisma.sale.findMany({
      where: {
        AND: [
          { saller_id: this.request.user.id },
          { active },
        ]
      },
      orderBy: {
        created_at: order
      },
      select: {
        active: true,
        category: true,
        created_at: true,
        updated_at: true,
        products: {
          where: {
            condition
          }
        }
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

  async findAll (query?: QuerySaleDto) {
    const { 
      active = true, 
      condition = 'new', 
      order = 'desc' 
    } = query || {}

    const sales = await this.prisma.sale.findMany({
      where: {
        active
      },
      orderBy: {
        created_at: order
      },
      include: {
        category: true,
        products: {
          where: {
            condition
          }
        },
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

  async update (payload: UpdateSaleDto) {
    const { 
      id,
      products,
      category_id 
    } = payload

    const saleExist = await this.prisma.sale.findFirst({
      where: {
        AND: [
          { id },
          { category_id }
        ]
      },
    })

    if (!saleExist) throw new NotFoundException({
      description: 'SALE_NOT_FOUND'
    })

    await this.prisma.sale.update({
      where: {
        id,
      },
      data: {
        products: {
          update: products.map(product => {
            const { 
              condition,
              description,
              name,
              price,
              sold,
             } = product

            return ({
              where: { 
                id: product.id
              },
              data: {
                condition,
                description,
                name,
                price,
                sold,
                updated_at: new Date()
              }
            })
          })
        }
      }
    })
  }

  async toggleActive (id: string) {
    const sale = await this.prisma.sale.findFirst({
      where: {
        AND: [
          { id },
          { saller_id: this.request.user.id }
        ]
      }
    })

    if (!sale) throw new NotFoundException({
      description: 'SALE_NOT_FOUND'
    })

    await this.prisma.sale.update({
      where: {
        id
      },
      data: {
        active: !sale.active
      }
    })

  }

  async fileUpload (files: Array<Express.Multer.File>, productsId: FileUploadDto) {
    const responses = await Promise.all(
      files.map(file => 
        this.cloudinaryService.uploadImage(file)
      )
    ) 

    return files.map((_, index) => responses[index])
  }
}