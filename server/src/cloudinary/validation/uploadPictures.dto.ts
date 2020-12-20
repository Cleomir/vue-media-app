import { ArrayNotEmpty, IsString } from 'class-validator';

export class UploadPicturesDto {
  @ArrayNotEmpty()
  @IsString({ each: true })
  files: string[];
}
