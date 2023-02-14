export const paths = {
  home: '/',
  marketplace: {
    create: '/marketplace/create',
    item: '/marketplace/create/:categoryId'
  },
  app: {
    product: '/app/product',
    report: '/app/relatorio',

  },
  auth: {
    signIn: 'login',
    signUp: 'sign-up',
    sendConfirmation: '/auth/email/send-confirmation',
    resetPassword: '/auth/reset-password/new',
  },
}
