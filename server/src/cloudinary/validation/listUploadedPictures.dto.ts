import { IsOptional, IsString } from 'class-validator';

export class listUploadedPicturesDto {
  @IsOptional()
  @IsString()
  next_cursor: string;
}
