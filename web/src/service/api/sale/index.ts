import { api } from ".."
import { CreateSaleRequest, Sale } from "./types"

function findAll () {
  return api.get<Sale[]>('/sale/all')
}

function create (payload: CreateSaleRequest) {
  return api.post('/sale', payload)
}

export const saleService = {
  findAll,
  create
}