import { Box, Button, ButtonIcon, Typography } from '@/components/common'
import { InputForm, InputPassword } from '@/components/common/hook-form'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormData } from './types'
import * as Styles from './styles'
import { loginValidationSchema } from './validations'
import { useAuth } from '@/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { paths } from '@/constants/routes'

export function Login (props: PropsWithChildren) {
  const { children } = props
  const { onLoginWithEmailPassword } = useAuth()

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { auth } = router.query

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema)
  })


  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await onLoginWithEmailPassword(data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Styles.Root open={auth === paths.auth.signIn} onOpenChange={() => router.push(router.pathname)}>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box>
            <Styles.Cancel asChild>
              <ButtonIcon label="close" icon={{ name: 'close' }} />
            </Styles.Cancel>
          </Box>
          <Box justifyContent="center" fullWidth >
            <Typography color="heading" fontWeight="800" as="h1" size="lg">Entrar</Typography>
          </Box>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              label="E-mail"
              register={register('email')}
            />
            <InputPassword 
              label="Senha"
              register={register('password')}
            />
            <Box flex={1} alignItems="flexEnd">
              <Button loading={isLoading} fullWidth>Entrar</Button>
            </Box>
          </Styles.Form>
          <Box justifyContent="center" marginTop={1}>
            <Typography>Não tem uma conta?</Typography>
            <Button 
              variant="letter"
              onClick={() => 
                router.push({ 
                  pathname: router.pathname, 
                  query: { auth: paths.auth.signUp } 
                })}  
            >Inscrever-se</Button>
          </Box>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}