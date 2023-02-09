const env = process.env;

export const environments = {
  port: env.PORT || 3333,
  jwtSecret: env.JWT_SECRET
}