import { IsOptional, IsString } from 'class-validator';

export class listUploadedPicturesDto {
  @IsOptional()
  @IsString()
  nextCursor: string;
}
