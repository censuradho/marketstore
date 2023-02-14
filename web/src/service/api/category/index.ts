import { api } from ".."
import { Category } from "./types"

function getCategory () {
  return api.get<Category[]>('/category')
}

export const categoryService = {
  getCategory
}