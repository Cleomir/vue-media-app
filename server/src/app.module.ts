import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import history from 'connect-history-api-fallback';

import { LoggerModule } from './logger/logger.module';
import { RequestLoggerService } from './logger/request-logger/request-logger.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PexelsModule } from './pexels/pexels.module';
import { UnsplashModule } from './unsplash/unsplash.module';
import appEnvConfig, { validate } from './app.config';
import { RequestLoggerModule } from './logger/request-logger/request-logger.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appEnvConfig], isGlobal: true, validate }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../client/dist'),
      exclude: ['/api*'],
    }),
    LoggerModule,
    RequestLoggerModule,
    CloudinaryModule,
    PexelsModule,
    UnsplashModule,
    HelpersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(history()).exclude('/api(.*)');
    consumer.apply(RequestLoggerService).forRoutes('*');
  }
}
