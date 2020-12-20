import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { v2 } from 'cloudinary';

import { AppModule } from './app.module';
import config from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '25mb' }));
  app.use(helmet());

  const {
    SERVER_PORT,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = config();
  v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  await app.listen(SERVER_PORT);
}
bootstrap();
