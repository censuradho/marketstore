import { Container } from '@/components/common'
import { Auth } from '@/layout/auth'
import { saleService } from '@/service/api/sale'
import { Sale } from '@/service/api/sale/types'
import { useEffect, useState } from 'react'
import { ProductCard } from './components'
import * as Styles from './styles'
import { HomeProps } from './types'

export function HomeLayout (props: HomeProps) {
  const [sales, setSales] = useState<Sale[]>([])

  const handleGetSales = async () => {
    const { data } = await saleService.findAll()

    setSales(data)
  }

  const renderSales = sales.map((value) => (
    <li key={value.id}>
      <ProductCard data={value} />
    </li>
  ))

  useEffect(() => {
    handleGetSales()
  }, [])

  return (
    <Styles.Container>
      <Auth />
      <Container>
        <Styles.List>
          {renderSales}
        </Styles.List>
      </Container>
    </Styles.Container>
  )
}