import { Typography } from '@/components/common'
import Image from 'next/image'
import * as Styles from './styles'
import { ProductCardProps } from './types'

export function ProductCard (props: ProductCardProps) {
  const { data } = props
  const { products = [] } = data

  const activeLabel = data.active ? 'Ativo' : 'Inativo'

  return (
    <Styles.Container>
      <Typography>{activeLabel}</Typography>
    </Styles.Container>
  )
}