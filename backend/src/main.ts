import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { environments } from './config/environments';
import { swaggerConfig } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(environments.port);
}
bootstrap();
