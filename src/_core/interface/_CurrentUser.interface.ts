import { EnvType, UserType } from '@core/enum';

export interface CurrUser {
  id: number;
  googleId: string;
  type: UserType;
  env: EnvType;
  iat: number;
  exp: number;
}
