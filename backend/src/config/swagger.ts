import { DocumentBuilder } from "@nestjs/swagger/dist";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Marketplace')
.addBearerAuth()
.setVersion('1.0')
.addTag('category')
.addTag('sale')
.addTag('auth')
.build();
