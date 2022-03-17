import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UserSettingUpdateDto {
  @IsOptional()
  @IsBoolean()
  isBiometricEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  isDarkModeEnabled?: boolean;

  @IsOptional()
  @IsString()
  defaultCurrency: string;
}
