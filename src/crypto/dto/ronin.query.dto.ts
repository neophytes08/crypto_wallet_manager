import { IsNotEmpty, IsNumberString } from 'class-validator';

export class RoninQueryDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  limit: number;
}
