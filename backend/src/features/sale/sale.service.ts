import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { randomUUID } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { AuthRequest } from "../auth/models";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateSaleDto } from "./dto/create";
import { FileUploadDto } from "./dto/create/file-upload.dto";
import { DestroyProductImageDto } from "./dto/delete/destroy-product-image.dto";
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
          },
          include: {
            images: true,
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
          },
          include: {
            images: true
          },
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

  private async cloudinaryUpload (files: Array<Express.Multer.File>) {
    const responses = await Promise.all(
      files.map(file => 
        this.cloudinaryService.uploadImage(file)
      )
    ) 

    return files.map((_, index) => responses[index])
  }

  async createProductImages (files: Array<Express.Multer.File>, payload: FileUploadDto) {
    const { productId } = payload

    const products = await this.prisma.product.findMany({
      where: {
        id: productId
      }
    })

   if (!products || products.length === 0) throw new NotFoundException({
    description: 'PRODUCT_NOT_FOUND'
   })

    const responses = await this.cloudinaryUpload(files)

    await this.prisma.product.update({
      where: {
        id: productId
      },
      data: {
        images: {
          createMany: {
            data: responses.map(response => ({
              public_id: response.public_id,
              format: response.format,
              height: response.height,
              width: response.width,
              id: randomUUID(),
              url: response.url
            }))
          }
        }
      }
    })

    return responses
  }

  async destroyProductImage (payload: DestroyProductImageDto) {
    const files = await this.prisma.file.findMany({
      where: {
        AND: [
          ...payload.ids.map(id => ({
            id
          }))
        ]
      }
    })

    const public_ids = files.map(value => value.public_id)
    const fileIds = files.map(file => ({ id: file.id }))

    await this.cloudinaryService.destroyFiles(public_ids)
    
    await this.prisma.file.deleteMany({
      where: {
        AND: fileIds
      }
    })

  }
}