import { User } from '@user/user.entity';
import { IsNotEmpty } from 'class-validator';

export class ActivityCreateDto {
  @IsNotEmpty()
  owner: User;

  @IsNotEmpty()
  editor: User;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  details: string;
}
