import { Icon } from '@/components/common'
import { ActiveLink } from '@/components/common/active-link'
import { paths } from '@/constants/routes'
import { useRouter } from 'next/router'
import * as Styles from './styles'
import { BottomNavProps } from './types'

export function BottomNav (props: BottomNavProps) {
  const router = useRouter();

  const {
    onToggleMenu
  } = props

  return (
    <Styles.Navigation>
      <Styles.List>
        <Styles.Item>
          <ActiveLink href={paths.app.product}>
            <Icon color={router.pathname === paths.app.product ? 'heading' : 'text'} name="dashboard" size={20} />
            <span>Products</span>
          </ActiveLink>
        </Styles.Item>
        <Styles.Item onClick={onToggleMenu}>
          <Icon color="text" name="menuLeft" size={20} />
          <span>Mais</span>
        </Styles.Item>
      </Styles.List>      
    </Styles.Navigation>
  )
}