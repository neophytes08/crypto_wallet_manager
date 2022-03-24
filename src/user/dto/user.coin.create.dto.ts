import { IsCoinGecko } from '@core/decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCoinCreate {
  @IsNotEmpty()
  @IsString()
  @IsCoinGecko({ message: 'Coin Id does not exist' })
  coin_id: string;
}
