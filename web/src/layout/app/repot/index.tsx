import { Box, Button, ButtonLink, Typography } from '@/components/common'
import { format } from '@/lib/date-fns'
import { transactionService } from '@/service/api/transactions'
import { Transaction } from '@/service/api/transactions/types'
import { BlobProvider , PDFViewer } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import { Card, Pdf } from './components'
import * as Styles from './styles'

export function ReportLayout () {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const groupBy = function(list: Record<string, any>[], key: string) {
    return list.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const transactionsGroupedBySameProduct = groupBy(transactions, 'productsId')

  const sameProductQuantity = Object.keys(transactionsGroupedBySameProduct).length
  const productsQuantity = transactions.length

  const productQuantityTotal = transactions
    .map(value => value.quantity)
    ?.reduce((prev, next) => prev + next, 0)

  const productAmount = transactions
    .map(value => (value?.quantity || 0) * (value?.products?.cost || 0))
    ?.reduce((prev, next) => prev + next, 0)

  const handleGetTransactions = async () => {
    const { data } = await transactionService.findAll()
    setTransactions(data)
  }

  const currentMonth = format(new Date(), 'LLLL')

  useEffect(() => {
    handleGetTransactions()
  }, [])

  return (
    <Styles.Container>
      <Styles.Header>
        <Typography as="h1" size="lg" color="heading" fontWeight="800">Relatório</Typography>
        <Box 
          flexDirection="column" 
          alignItems={{
            '@initial': 'flexStart',
            '@table-min': "flexEnd"
          }} 
          gap={1}
        >
          <Typography fontWeight="600" color="heading">Referente ao mês de {currentMonth}</Typography>
          <BlobProvider 
            document={(
              <Pdf 
                productAmount={productAmount}
                productsQuantity={productsQuantity}
                productQuantityTotal={productQuantityTotal}
                sameProductQuantity={sameProductQuantity}
              />
            )}>
            {({  url }) => (
              <ButtonLink 
                variant="secondary"
                target="_blank"
                href={url || ''}
                icon={{ name: 'pdf' }}
              >Gerar PDF</ButtonLink>
            )}
          </BlobProvider>
        </Box>
      </Styles.Header>
      <Styles.Section>
        <Box 
          fullWidth
          gap={2}
          flexDirection={{
            '@initial': 'column',
            '@table-min': 'row'
          }}
        >
          <Card icon="trendingUp" title="Quantidade" quantity={productsQuantity} />
          <Card icon="trendingUp" title="Mesmo tipo quantidade" quantity={sameProductQuantity} />
          <Card icon="trendingUp" title="Quantidade total" quantity={productQuantityTotal} />
          <Card icon="money" title="Valor total" amount={productAmount} />
        </Box>
      </Styles.Section>
    </Styles.Container>
  )
}