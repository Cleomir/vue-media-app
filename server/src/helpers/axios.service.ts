import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios(config);
  }
}
