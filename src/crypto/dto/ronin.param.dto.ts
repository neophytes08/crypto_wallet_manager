import { IsNotEmpty, IsNumberString } from 'class-validator';

export class RoninParamDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
