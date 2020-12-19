import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { RequestLoggerModule } from './request-logger/request-logger.module';

@Module({
  providers: [LoggerService],
  imports: [RequestLoggerModule]
})
export class LoggerModule {}
