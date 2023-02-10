import { Sale as ISale } from "@prisma/client";
import { Product } from "./product";

export class Sale implements ISale {
  category_id: string;
  id: string;
  active: boolean;
  saller_id: string;
  created_at: Date;
  updated_at: Date;
  products: Product[]
}