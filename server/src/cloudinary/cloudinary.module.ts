import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService, LoggerService],
})
export class CloudinaryModule {}
