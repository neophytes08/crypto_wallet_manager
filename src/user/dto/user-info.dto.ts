export class UserInfoDto {
  id: number;

  name?: string;

  googleId: string;

  email?: string;

  createDate: Date;

  updateDate: Date;

  settings?: Option;
}

class Option {
  isBiometricEnabled: boolean;
  isDarkModeEnabled: boolean;
  defaultCurrency: string;
}
