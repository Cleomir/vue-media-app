import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import config from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(json({ limit: '20mb' }));
  app.use(helmet());

  const { SERVER_PORT } = config();
  await app.listen(SERVER_PORT);
}
bootstrap();
