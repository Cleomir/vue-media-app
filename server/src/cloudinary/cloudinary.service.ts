import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';

import { LoggerService } from 'src/logger/logger.service';
import { listUploadedPicturesDto } from './validation/listUploadedPictures.dto';
import { UploadPicturesDto } from './validation/uploadPictures.dto';

@Injectable()
export class CloudinaryService {
  constructor(private readonly logger: LoggerService) {}

  async uploadPictures(
    uploadPicturesDto: UploadPicturesDto,
    requestId: string,
  ): Promise<UploadApiResponse[]> {
    this.logger.log(
      'Uploading pictures with params:',
      `${CloudinaryService.name}#uploadPictures`,
      requestId,
      UploadPicturesDto,
    );
    const uploadedFilePromises: Promise<UploadApiResponse>[] = [];
    uploadPicturesDto.files.forEach((file: string) => {
      uploadedFilePromises.push(v2.uploader.upload(file));
    });
    const response: UploadApiResponse[] = await Promise.all(
      uploadedFilePromises,
    );
    this.logger.log(
      'Pictures uploaded',
      `${CloudinaryService.name}#uploadPictures`,
      requestId,
      response,
    );

    return response;
  }

  async listUploadedPictures(
    listUploadedPicturesDto: listUploadedPicturesDto,
    requestId: string,
  ): Promise<any> {
    this.logger.log(
      'Listing uploaded pictures with params:',
      `${CloudinaryService.name}#listUploadedPictures`,
      requestId,
      listUploadedPicturesDto,
    );
    const response: any = await v2.api.resources({
      next_cursor: listUploadedPicturesDto.next_cursor,
    });
    this.logger.log(
      'Uploaded pictures listed',
      `${CloudinaryService.name}#uploadPictures`,
      response,
    );

    return response;
  }
}
