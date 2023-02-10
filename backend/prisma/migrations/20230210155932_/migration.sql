-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_category_id_fkey";

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "category_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "format" TEXT,
    "product_id" TEXT,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
