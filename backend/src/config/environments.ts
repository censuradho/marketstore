const env = process.env;

export const environments = {
  port: env.PORT || 3333,
  jwtSecret: env.JWT_SECRET,
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_KEY,
    secret: process.env.CLOUDINARY_SECRET,
  }
}