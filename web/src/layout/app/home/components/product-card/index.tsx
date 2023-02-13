import { Box, Typography } from '@/components/common'
import Image from 'next/image'
import * as Styles from './styles'
import { ProductCardProps } from './types'

export function ProductCard (props: ProductCardProps) {
  const { data } = props
  const { product } = data

  const [firstImage] = product.images
  
  const activeLabel = data.active ? 'Ativo' : 'Inativo'

  return (
    <Styles.Container>
      <Styles.Figure>
        <Image src={firstImage?.url} alt="" fill  />
      </Styles.Figure>
      <Box flexDirection="column" gap={0.3}>
        <Typography size="sm">{product.name}</Typography>
        <Typography size="xsm">{product?.description}</Typography>
      </Box>
    </Styles.Container>
  )
}