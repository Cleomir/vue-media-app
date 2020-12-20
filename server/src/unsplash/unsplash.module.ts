import { Module } from '@nestjs/common';
import { AxiosService } from 'src/helpers/axios.service';
import { LoggerService } from 'src/logger/logger.service';
import { UnsplashController } from './unsplash.controller';
import { UnsplashService } from './unsplash.service';

@Module({
  controllers: [UnsplashController],
  providers: [UnsplashService, LoggerService, AxiosService],
})
export class UnsplashModule {}
