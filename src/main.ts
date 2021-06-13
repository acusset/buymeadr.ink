import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FONT_URL || 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT'],
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
