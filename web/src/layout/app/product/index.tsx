import { Box, Icon, Pagination, Typography } from '@/components/common'
import { productService } from '@/service/api/product'
import { Product, Query } from '@/service/api/product/types'
import qs from 'querystring'
import { useEffect, useState } from 'react'
import * as Styles from './styles'

import { TableComponent } from '@/components/common'
import { paths } from '@/constants/routes'
import { useRouter } from 'next/router'

import { toLocaleString } from '@/utils/helpers'

export const ths = [
  {
    label: 'ID',
    id: 'id'
  },
  {
    label: 'Nome',
    id: 'name'
  },
  {
    label: 'Preço',
    id: 'cost'
  },
  {
    label: 'Quantidade',
    id: 'quantity'
  },
  {
    label: 'Localidade',
    id: 'locationsId'
  },
  {
    label: 'Familia',
    id: 'familiesId'
  }
]

export function ProductLayout () {
  const router = useRouter()
  
  const {
    _order = 'asc',
    _sort = 'id',
    _page = 1
  } = (router.query as any || {}) as Query

  const perPage = 10
  const [products, setProducts] = useState<Product[]>([])
  const [totalResults, setTotalResults] = useState(0)

  const totalPages = Math.ceil(totalResults / perPage)

  const handleGetProducts = async (query: Query) => {
    const { data, headers } = await productService.getProducts(query)
    setProducts(data)
    setTotalResults(Number(headers['x-total-count'] || 0))
  }


  const handleSortBy = (sort: Query['_sort']) => {
    const isAsc = sort !== _sort || _order === 'desc'

    const orderParsed = {
      asc: isAsc,
      desc: !isAsc
    }

    const [orderValue] = Object
      .entries(orderParsed)
      .filter(([key, value]) => value)
      .map(([key]) => key)

    const _query = qs.stringify({
      _sort: sort,
      _page,
      _order: orderValue,
    })

    router.push(`${paths.app.product}?${_query}`)
  }

  const handlePageChange = (page: number) => {
    const query= qs.stringify({
      _order,
      _sort,
      _page: page
    }) 

    router.push(`${paths.app.product}?${query}`)

  }

  const renderThs = ths.map((value, index) => {
    const isAsc = value.id === _sort && _order === 'asc'
    const isDesc = value.id === _sort && _order === 'desc'
    return (
      <TableComponent.Th 
        key={index}
        onClick={() => handleSortBy(value.id as any)}
      >
        <Box alignItems="center" gap={0.5}>
          {value.label}
          <Box gap={0.1}>
            <Icon size={10} name="arrowDropDown" color={isDesc ? 'quaternary' : 'text'} />
            <Icon size={10} name="arrowDropUp" color={isAsc ? 'quaternary' : 'text'} />
          </Box>
        </Box>
      </TableComponent.Th>
    )
  })

  const renderProducts = products.map(product => {
    const family = product?.families || {}

    return (
      <TableComponent.Tr key={product.id}>
        <TableComponent.Td>{product.id}</TableComponent.Td>
        <TableComponent.Td>{product.name}</TableComponent.Td>
        <TableComponent.Td>{toLocaleString(product.cost)}</TableComponent.Td>
        <TableComponent.Td>{product.quantity}</TableComponent.Td>
        <TableComponent.Td>{product?.locations?.name}</TableComponent.Td>
        <TableComponent.Td>{family?.name}</TableComponent.Td>
      </TableComponent.Tr>
    )
  })

  useEffect(() => {
    handleGetProducts({
      _order,
      _sort,
      _page,
      _limit: perPage
    })
  }, [_order, _page, _sort])

  return (
    <Styles.Container>
      <Box flexDirection="column">
        <Styles.Header>
          <Typography as="h1" size="lg" color="heading" fontWeight="800">Dashboard</Typography>
        </Styles.Header>
        <Styles.Section>
          <Styles.SectionHeader>
            <Typography size="md" color="heading" fontWeight="600">Products</Typography>
            <Typography size="xsm"><Typography as="strong">{renderProducts.length}</Typography> resultados por página</Typography>
          </Styles.SectionHeader>
          <TableComponent.Table>
            <TableComponent.THead>
              <TableComponent.Tr>
                {renderThs}
              </TableComponent.Tr>
            </TableComponent.THead>
            <TableComponent.TBody>
              {renderProducts}
            </TableComponent.TBody>
          </TableComponent.Table>
          <Styles.SectionFooter>
            <Typography size="xsm"><Typography as="strong">{totalResults}</Typography> resultados encontrados</Typography>
            <Pagination 
              currentPage={Number(_page)}
              totalPages={Number(totalPages)}
              onPageChange={(page) => handlePageChange(page)}
            />
          </Styles.SectionFooter>
        </Styles.Section>
      </Box>
    </Styles.Container>
  )
}