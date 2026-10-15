import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Разрешаем запросы из Angular-клиента (он работает на другом порту — 4200)
  app.enableCors({ origin: 'http://localhost:4200' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
