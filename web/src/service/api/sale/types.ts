export enum Condition {
  new = 'new',
  newLike = 'newLike'
}

interface Image {
  id: string
  width: number
  height: number
  url: string
  format: string
}

export interface Product {
  name: string;
  sale_id: string;
  id: string;
  description: string;
  sold: boolean;
  price: number;
  condition: Condition;
  created_at: Date;
  updated_at: Date;
  images: Image[]
}

export interface Sale {
  category_id: string;
  id: string;
  active: boolean;
  saller_id: string;
  created_at: string;
  updated_at: string;
  product: Product
}