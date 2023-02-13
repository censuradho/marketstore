import { Product } from "../product/types"

export interface Transaction {
  id: number
  cost: number
  quantity: number
  productsId: number
  products: Product
}