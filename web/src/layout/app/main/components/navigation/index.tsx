import { Avatar, Icon, ActiveLink, AdminView, Box } from '@/components/common'
import { paths } from '@/constants/routes'
import { useAuth } from '@/context/auth'
import * as Styles from './styles'
import { NavigationProps } from './types'

export function Navigation (props: NavigationProps) {
  const {
    open,
    onToggleMenu
  } = props
  
  const { onSignOut, auth } = useAuth()

  return (
    <Styles.Overlay onClick={onToggleMenu}  open={open}>
      <Styles.Navigation onClick={event => event.stopPropagation()}>
        <Styles.Header>
          <Styles.Root>
            <Styles.Trigger>
              <Avatar alt="username" />
              <Styles.Username>Username</Styles.Username>
            </Styles.Trigger>
            <Styles.Portal>
              <Styles.DropdownMenuContent sideOffset={5}>
                <Styles.DropdownMenuItem>Perfil</Styles.DropdownMenuItem>
                <Styles.DropdownMenuSeparator />
                <Styles.DropdownMenuItem onClick={onSignOut}>Sair</Styles.DropdownMenuItem>
              </Styles.DropdownMenuContent>
            </Styles.Portal>
          </Styles.Root>
        </Styles.Header>
        <Styles.List>
          <AdminView>
            <Styles.Item>
              <ActiveLink href={paths.app.product}>
                <Icon name="dashboard" />
                Dashboard
              </ActiveLink>
            </Styles.Item>
            <AdminView>
              <Styles.Item>
                <ActiveLink href={paths.app.report}>
                  <Icon name="report" />
                  <Box alignItems="center" gap={0.5}>
                  Relatório
                  </Box>
                </ActiveLink>
              </Styles.Item>
            </AdminView>
          </AdminView>
        </Styles.List>
      </Styles.Navigation>
    </Styles.Overlay>
  )
}