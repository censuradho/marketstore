import { Document, Page, Text, View } from '@react-pdf/renderer';

import { PdfProps } from './types';

import { Styles } from './styles';
import { toLocaleString } from '@/utils/helpers';

export function Pdf (props: PdfProps) {
  const {
    productAmount,
    productQuantityTotal,
    productsQuantity,
    sameProductQuantity
  } = props

  return (
    <Document>
      <Page size="A4" style={Styles.page}>
        <View style={Styles.section}>
          <Text style={Styles.title}>Relatório</Text>
          <View style={Styles.Table}>
            <View style={Styles.Cell}>
              <Text style={Styles.Td}>Quantidade</Text>
              <Text style={Styles.Td}>{productsQuantity}</Text>
            </View>
            <View style={Styles.Cell}>
              <Text style={Styles.Td}>Mesmo tipo quantidade</Text>
              <Text style={Styles.Td}>{sameProductQuantity}</Text>
            </View>
            <View style={Styles.Cell}>
              <Text style={Styles.Td}>Quantidade total</Text>
              <Text style={Styles.Td}>{productQuantityTotal}</Text>
            </View>
            <View style={Styles.Cell}>
              <Text style={Styles.Td}>Valor total</Text>
              <Text style={Styles.Td}>{toLocaleString(productAmount)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}