import { Box, Button, ButtonIcon, Typography } from '@/components/common'
import { InputForm, InputPassword } from '@/components/common/hook-form'
import { paths } from '@/constants/routes'
import { useAuth } from '@/context'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Styles from './styles'
import { SignUpFormData } from './types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpValidationSchema } from './validations'
import Link from 'next/link'

export function SignUp () {
  const { onSignUp } = useAuth()

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { auth } = router.query

  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpValidationSchema)
  })


  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true)
      await onSignUp(data)
      router.push(router.pathname)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Styles.Root open={auth === paths.auth.signUp} onOpenChange={() => router.push(router.pathname)}>
      <Styles.Portal>
        <Styles.Overlay />
        <Styles.Content>
          <Box>
            <Styles.Cancel asChild>
              <ButtonIcon label="close" icon={{ name: 'close' }} />
            </Styles.Cancel>
          </Box>
          <Box justifyContent="center" fullWidth >
            <Typography color="heading" fontWeight="800" as="h1" size="lg">Cadastro</Typography>
          </Box>
          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <Box fullWidth gap={1}>
              <InputForm
                fullWidth
                id="first_name"
                label="Primeiro nome"
                register={register('first_name')}
                errorMessage={errors.first_name?.message}
              />
              <InputForm
                fullWidth
                id="last_name"
                label="Último nome"
                register={register('last_name')}
                errorMessage={errors.last_name?.message}
              />
            </Box>
            <InputForm
              id="email"
              label="E-mail"
              register={register('email')}
              errorMessage={errors.email?.message}
            />
            <InputPassword
              id="password"
              label="Senha"
              register={register('password')}
              errorMessage={errors.password?.message}
            />
            <Box flex={1} alignItems="flexEnd">
              <Button loading={isLoading} fullWidth>Entrar</Button>
            </Box>
          </Styles.Form>
          <Box justifyContent="center" marginTop={1}>
            <Typography>Já  tem uma conta? </Typography>
            <Button 
              variant="letter"
              onClick={() => 
                router.push({ 
                  pathname: router.pathname, 
                  query: { auth: paths.auth.signIn } 
                })}  
            >Entrar</Button>
          </Box>
        </Styles.Content>
      </Styles.Portal>
    </Styles.Root>
  )
}