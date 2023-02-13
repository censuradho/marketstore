import { StyleSheet } from '@react-pdf/renderer';
import { theme }from 'stitches.config'

const { colors, fontSizes } = theme

export const Styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background.value
  },
  title: {
    fontSize: 23
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  Table: {
    flexDirection: 'row'
  },
  Cell: {
    flexDirection: 'column',
  },
  Td: {
    fontWeight: 400,
    textTransform: 'uppercase',
    fontSize: 12,
    padding: '20.8px 16px',
    textAlign: 'left',
    marginTop: 5
  }
});