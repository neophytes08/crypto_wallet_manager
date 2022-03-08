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
  @IsOptional()
  @IsString()
  @IsValidUsernameOrEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsObject()
  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => DeviceCreateDto)
  // device: DeviceCreateDto;

  /**
   * Only present when from type is `mobile`
   */
  @IsOptional()
  @IsBoolean()
  isBiometricEnabled?: boolean;
}

export class LoginResDto {
  accessToken: string;
}
