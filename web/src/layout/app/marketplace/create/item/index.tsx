import { Box, Button, ButtonIcon, Container, Typography } from '@/components/common'
import { InputForm } from '@/components/common/hook-form'
import { saleService } from '@/service/api/sale'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Styles from './styles'
import { CreateSaleFormData } from './types'
import { createSaleValidationSchema } from './validations'

export function CreateSaleItemLayout () {
  const router = useRouter()

  const { categoryId } = router.query

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateSaleFormData>({
    resolver: yupResolver(createSaleValidationSchema)
  })



  const onSbumit = async (payload: CreateSaleFormData) => {
    // await saleService.create({
    //   category_id: categoryId as string,
    //   product: {
    //     description: payload.description,
    //     name: payload.name,
    //     price: payload.price,
    //   }
    // })
  }


  return (
    <Styles.Container>
      <Container>
        <Box justifyContent="center" fullWidth marginBottom={3} alignItems="center">
          <ButtonIcon 
            label="backward" 
            icon={{ name: 'arrowLeft'}} 
            onClick={() => router.back()}
          />
          <Typography as="h1" size="md">Escolha o tipo do produto</Typography>
        </Box>
        <Styles.Form onSubmit={handleSubmit(onSbumit)}>
          <Box flexDirection="column" gap={1}>
            <InputForm 
              label="Nome do produto"
              register={register('name')}
              errorMessage={errors.name?.message}
            />
            <InputForm 
              label="Descrição"
              register={register('description')}
              errorMessage={errors.description?.message}
            />
            <InputForm 
              label="Preço"
              register={register('price')}
              errorMessage={errors.price?.message}
            />
            <Button fullWidth>Salvar</Button>
          </Box>
        </Styles.Form>
      </Container>
    </Styles.Container>
  )
}