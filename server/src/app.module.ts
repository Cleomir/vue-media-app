import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import history from 'connect-history-api-fallback';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import appEnvConfig from './app.config';
import { RequestLoggerService } from './logger/request-logger/request-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appEnvConfig], isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../client/dist'),
      exclude: ['/api*'],
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(history()).exclude('/api(.*)');
    consumer.apply(RequestLoggerService).forRoutes('*');
  }
}
