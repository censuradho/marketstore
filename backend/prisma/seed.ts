import {  PrismaClient, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
const prisma = new PrismaClient()

const seedsCategory: Prisma.CategoryCreateInput[] = [
  {
    id: randomUUID(),
    name: 'physical',
  },
  {
    id: randomUUID(),
    name: 'digital',
  }
]

async function main() {
  const categoriesToCreate = seedsCategory.map(category => 
    prisma.category.create({
      data: category
    })  
  )

  await prisma.$transaction(categoriesToCreate)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })