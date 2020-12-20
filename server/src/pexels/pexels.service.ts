import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { AxiosService } from 'src/helpers/axios.service';
import { LoggerService } from 'src/logger/logger.service';

import { SearchPicturesByKeywordDto } from './validation/searchPicturesByKeyword.dto';

@Injectable()
export class PexelsService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  async searchPicturesByKeyword(
    searchPicturesByKeywordDto: SearchPicturesByKeywordDto,
    requestId: string,
  ): Promise<any> {
    this.logger.log(
      'Searching for pictures with params:',
      `${PexelsService.name}#searchPicturesByKeyword`,
      requestId,
      searchPicturesByKeywordDto,
    );
    const apiUrl: string = searchPicturesByKeywordDto.pexels_next_page
      ? searchPicturesByKeywordDto.pexels_next_page
      : 'https://api.pexels.com/v1/search';

    const response: AxiosResponse<any> = await this.axiosService.request({
      url: apiUrl,
      method: 'GET',
      headers: {
        Authorization: this.configService.get<string>('PEXELS_API_KEY'),
      },
      params: searchPicturesByKeywordDto.pexels_next_page
        ? undefined
        : searchPicturesByKeywordDto,
    });
    if (response.status !== 200) {
      throw new InternalServerErrorException(undefined, response.statusText);
    }

    this.logger.log(
      'Pictures searched:',
      `${PexelsService.name}#searchPicturesByKeyword`,
      requestId,
      response,
    );

    return response.data;
  }
}
