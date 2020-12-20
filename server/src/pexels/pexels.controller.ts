import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { PexelsService } from './pexels.service';

import { SearchPicturesByKeywordDto } from './validation/searchPicturesByKeyword.dto';

@Controller('api/pexels')
export class PexelsController {
  constructor(
    private readonly pexelsService: PexelsService,
    private readonly logger: LoggerService,
  ) {}

  @Get('search')
  async search(
    @Query() searchPicturesByKeywordDto: SearchPicturesByKeywordDto,
    @Req() request: Request,
  ) {
    try {
      const response: any = await this.pexelsService.searchPicturesByKeyword(
        searchPicturesByKeywordDto,
        request.id,
      );
      this.logger.log(
        'Response status 200',
        `${PexelsService.name}#search`,
        request.id,
      );

      return response;
    } catch (error) {
      this.logger.error(
        'Error:',
        `${PexelsController.name}#search`,
        request.id,
        error,
      );

      throw error;
    }
  }
}
