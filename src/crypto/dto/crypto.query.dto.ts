import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CryptoQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  page: string;
}
