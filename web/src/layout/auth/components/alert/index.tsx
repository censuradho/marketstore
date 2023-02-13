import { Box, Button, Container, Typography } from '@/components/common'
import { paths } from '@/constants/routes'
import { useAuth } from '@/context'
import { useRouter } from 'next/router'
import { Login } from '../login'
import * as Styles from './styles'

export function Alert () {
  const { auth }  = useAuth()


  const router = useRouter()

  if (auth) return null

  return (
    <Styles.Container>
      <Container>
        <Box fullWidth>
          <Box flexDirection="column" flex={1} fullWidth>
            <Typography size="md" fontWeight="600">Não perca nenhuma promoção</Typography>
            <Typography>As pessoas que usam nossa plataforma são as primeiras a vender/comprar</Typography>
          </Box>
          <Box gap={1}>
            <Button onClick={() => 
              router.push({ 
                pathname: router.pathname, 
                query: { auth: paths.auth.signIn } 
              })
            }>Entrar</Button>
            <Button onClick={() => 
              router.push({ 
                pathname: router.pathname, 
                query: { auth: paths.auth.signUp } 
              })
            }>Inscrever-se</Button>
          </Box>
        </Box>
      </Container>
    </Styles.Container>
  )
}