import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceCreateDto {
  @IsNotEmpty()
  @IsString()
  deviceType: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  modelVersion: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @IsNotEmpty()
  @IsString()
  osVersion: string;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiHideProperty()
  uuid?: string;

  @ApiHideProperty()
  ipAddress?: string;

  @ApiHideProperty()
  source?: string;

  @ApiHideProperty()
  browser?: string;
}
