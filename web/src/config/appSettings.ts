export const appSettings = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || '@generic-name',
  siteUrl: process.env.SITE_URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || process.env.URL || 'http://localhost:3000'
} 

