import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsValidUsernameOrEmail } from '@core/decorator';
import { DeviceCreateDto } from '@device/dto/device.create.dto';
import { Type } from 'class-transformer';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsValidUsernameOrEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeviceCreateDto)
  device: DeviceCreateDto;

  /**
   * Only present when from type is `mobile`
   */
  @IsOptional()
  @IsBoolean()
  isBiometricEnabled?: boolean;
}

export class LoginResDto {
  accessToken?: string;
}
