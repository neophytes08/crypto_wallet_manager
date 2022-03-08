import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class CrytoBalance {
  axs: number;

  slp: number;

  eth: number;
}

export class CryptoBalanceDetails {
  @IsArray()
  @ValidateNested()
  @Type(() => CrytoBalance)
  balance: CrytoBalance;
}
