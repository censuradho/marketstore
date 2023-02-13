import { FORM_ERROR_MESSAGES } from '@/constants/messages'
import * as y from 'yup'

export const loginValidationSchema = y.object({
  email: y.string().email(FORM_ERROR_MESSAGES.invalid).required(FORM_ERROR_MESSAGES.required),
  password: y.string().required(FORM_ERROR_MESSAGES.required),
})