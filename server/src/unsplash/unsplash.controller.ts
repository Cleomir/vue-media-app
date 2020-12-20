import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { LoggerService } from 'src/logger/logger.service';
import { UnsplashService } from './unsplash.service';
import { SearchPicturesByKeywordDto } from './validation/searchPicturesByKeyword.dto';

@Controller('/api/unsplash')
export class UnsplashController {
  constructor(
    private readonly unsplashService: UnsplashService,
    private readonly logger: LoggerService,
  ) {}

  @Get('search')
  async search(
    @Query() searchPicturesByKeywordDto: SearchPicturesByKeywordDto,
    @Req() request: Request,
  ) {
    try {
      const response: any = await this.unsplashService.searchPicturesByKeyword(
        searchPicturesByKeywordDto,
        request.id,
      );
      this.logger.log(
        'Response status 200',
        `${UnsplashController.name}#search`,
        request.id,
      );

      return response;
    } catch (error) {
      this.logger.error(
        'Error:',
        `${UnsplashController.name}#search`,
        request.id,
        error,
      );

      throw error;
    }
  }
}
