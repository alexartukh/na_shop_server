import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Разрешаем запросы из Angular-клиента (он работает на другом порту — 4200)
  app.enableCors({ origin: 'http://localhost:4200' });

  // Swagger: список всех эндпоинтов на http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('Nest Shop API')
    .addBearerAuth() // кнопка Authorize — вставить токен из /auth/login
    .addSecurityRequirements('bearer') // отправлять токен во всех запросах
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
