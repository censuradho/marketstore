import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class CategoryService {

  constructor (private readonly prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.category.findMany()
  }
}