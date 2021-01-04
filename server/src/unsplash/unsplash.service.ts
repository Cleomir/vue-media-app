import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

import { AxiosService } from 'src/helpers/axios.service';
import { LoggerService } from 'src/logger/logger.service';
import { SearchPicturesByKeywordDto } from './validation/searchPicturesByKeyword.dto';

@Injectable()
export class UnsplashService {
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
      `${UnsplashService.name}#searchPicturesByKeyword`,
      requestId,
      searchPicturesByKeywordDto,
    );
    const apiUrl: string = searchPicturesByKeywordDto.unsplashNextPage
      ? searchPicturesByKeywordDto.unsplashNextPage
      : 'https://api.unsplash.com/search/photos';
    const response: AxiosResponse<any> = await this.axiosService.request({
      url: apiUrl,
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${this.configService.get<string>(
          'UNSPLASH_API_KEY',
        )}`,
      },
      params: searchPicturesByKeywordDto.unsplashNextPage
        ? undefined
        : searchPicturesByKeywordDto,
    });
    if (response.status !== 200) {
      throw new InternalServerErrorException(undefined, response.statusText);
    }

    this.logger.log(
      'Pictures searched:',
      `${UnsplashService.name}#searchPicturesByKeyword`,
      requestId,
      response,
    );

    return response.data;
  }
}
