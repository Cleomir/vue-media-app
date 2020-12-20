import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { Request } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { CloudinaryService } from './cloudinary.service';
import { listUploadedPicturesDto } from './validation/listUploadedPictures.dto';

import { UploadPicturesDto } from './validation/uploadPictures.dto';

@Controller('/api/cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly logger: LoggerService,
  ) {}

  @Post('upload')
  async uploadPictures(
    @Body() uploadPicturesDto: UploadPicturesDto,
    @Req() request: Request,
  ) {
    try {
      const response: UploadApiResponse[] = await this.cloudinaryService.uploadPictures(
        uploadPicturesDto,
        request.id,
      );
      this.logger.log(
        'Response status 201',
        `${CloudinaryController.name}#uploadPictures`,
        request.id,
      );

      return response;
    } catch (error) {
      this.logger.error(
        'Error:',
        `${CloudinaryController.name}#uploadPictures`,
        request.id,
        error,
      );

      throw error;
    }
  }

  @Get('')
  async listUploadedPictures(
    @Query() listUploadedPicturesDto: listUploadedPicturesDto,
    @Req() request: Request,
  ) {
    try {
      const response: any = await this.cloudinaryService.listUploadedPictures(
        listUploadedPicturesDto,
        request.id,
      );
      this.logger.log(
        'Response status 200',
        `${CloudinaryController.name}#listUploadedPictures`,
        request.id,
      );

      return response;
    } catch (error) {
      this.logger.error(
        'Error:',
        `${CloudinaryController.name}#listUploadedPictures`,
        request.id,
        error,
      );

      throw error;
    }
  }
}
