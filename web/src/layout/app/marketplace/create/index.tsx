import { Box, ButtonIcon, Container, Icon, Typography } from '@/components/common'
import { paths } from '@/constants/routes'
import { categoryService } from '@/service/api/category'
import { Category, CategoryName } from '@/service/api/category/types'
import { resolvePath } from '@/utils/helpers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as Styles from './styles'

export function MarketplaceCreateLayout () {
  const [categories, setCategories] = useState<Category[]>([])

  const router = useRouter()

  const categoryMap = {
    [CategoryName.physical]: {
      title: 'Físico',
      description: 'Venda de produtos físicos como celular, notebook etc'
    },
    [CategoryName.digital]: {
      title: 'Digital',
      description: 'Venda de produtos digitais como ebooks, wallpapers etc'
    }
  }

  const handleGetCategories = async () => {
    const { data } = await categoryService.getCategory()
    setCategories(data)
  }


  const renderCategories = categories.map(value => {
    const name = value.name as keyof typeof categoryMap

    return (
      <li key={value.id}>
        <Styles.Category href={resolvePath(paths.marketplace.item, { categoryId: value.id })} >
          <Styles.IconBox>
            <Icon name={value.name as any} size={30} color="heading" />
          </Styles.IconBox>
          <Typography>{categoryMap[name].title}</Typography>
          <Typography size="xsm" textAlign="center">{categoryMap[name].description}</Typography>
        </Styles.Category>
      </li>
    )
  })

  useEffect(() => {
    handleGetCategories()
  }, [])

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
        <Styles.List>
          {renderCategories}
        </Styles.List>
      </Container>
    </Styles.Container>
  )
}