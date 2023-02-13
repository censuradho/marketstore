/*
  Warnings:

  - A unique constraint covering the columns `[sale_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_sale_id_key" ON "products"("sale_id");
