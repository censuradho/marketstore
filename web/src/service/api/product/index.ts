import { api } from ".."

import { Product, Query } from "./types"

import qs from 'querystring'

function getProducts (query: Query = {
  _order: 'asc',
  _sort: 'id',
  _page: 1,
  _limit: 10
}) {
  const queryParsed = qs.stringify({
    ...query,
    _expand: ['families', 'locations'],
  })
  return api.get<Product[]>(`/products?${queryParsed}`)
}

export const productService = {
  getProducts
}