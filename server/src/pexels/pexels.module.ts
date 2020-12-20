import { Module } from '@nestjs/common';
import { AxiosService } from 'src/helpers/axios.service';
import { LoggerService } from 'src/logger/logger.service';
import { PexelsController } from './pexels.controller';
import { PexelsService } from './pexels.service';

@Module({
  controllers: [PexelsController],
  providers: [PexelsService, LoggerService, AxiosService],
})
export class PexelsModule {}
