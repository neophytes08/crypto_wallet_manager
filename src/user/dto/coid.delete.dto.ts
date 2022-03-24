import { IsNotEmpty } from 'class-validator';

export class UserCoinDeleteParam {
  @IsNotEmpty()
  id: string;
}
