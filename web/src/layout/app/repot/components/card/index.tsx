import { Box, Icon, Typography } from '@/components/common'
import * as Styles from './styles'
import { CardProps } from './types'

import { toLocaleString } from '@/utils/helpers'

export function Card (props: CardProps) {
  const { 
    amount,
    title,
    icon,
    quantity
  } = props

  return (
    <Styles.Container >
      <Box flexDirection="column" gap={0.7}>
        <Box justifyContent="space-between" alignItems="center">
          <Typography color="heading" size="sm" fontWeight="600" >{title}</Typography>
          <Styles.IconView>
            <Icon name={icon} />
          </Styles.IconView>
        </Box>
        {amount && <Typography fontWeight="500">{toLocaleString(amount)}</Typography>}
        {quantity && <Typography fontWeight="500">{quantity}</Typography>}
      </Box>
    </Styles.Container>
  )
}