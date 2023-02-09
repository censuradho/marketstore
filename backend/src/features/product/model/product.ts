import { Product as TypeProduct } from "@prisma/client";

export enum Condition {
  new = 'new',
  newLike = 'newLike'
}

export class Product implements TypeProduct {
  id: string;
  description: string;
  sold: boolean;
  price: number;
  condition: Condition;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  active: boolean;
}