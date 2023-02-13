import { api } from ".."
import { Transaction } from "./types"

function findAll () {
  return api.get<Transaction[]>('/transactions', {
    params: {
      _expand: 'products'
    }
  })
}

export const transactionService = {
  findAll
}