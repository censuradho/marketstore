import { api } from ".."
import { Sale } from "./types"

function findAll () {
  return api.get<Sale[]>('/sale/all')
}

export const saleService = {
  findAll
}