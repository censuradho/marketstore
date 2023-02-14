import { FORM_ERROR_MESSAGES } from '@/constants/messages'
import * as y from 'yup'

export const createSaleValidationSchema = y.object({
  name: y.string().required(FORM_ERROR_MESSAGES.required),
  description: y.string().required(FORM_ERROR_MESSAGES.required),
  price: y.string().required(FORM_ERROR_MESSAGES.required),
})