import { IsNotEmpty, IsString } from 'class-validator';

export class RoninAddressQueryDto {
  @IsNotEmpty()
  @IsString()
  address: string;
}
