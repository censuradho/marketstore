import { Sale as ISale } from "@prisma/client";
import { Product } from "src/features/product/model/product";

export class Sale implements ISale {
  id: string;
  active: boolean;
  saller_id: string;
  created_at: Date;
  updated_at: Date;
  products: Product[]
}