import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidUsernameOrEmail } from '@core/decorator';

export class LoginDto {
  @IsOptional()
  @IsString()
  @IsValidUsernameOrEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

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
