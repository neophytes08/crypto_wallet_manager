import { WalletType } from '@core/enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RoninCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['ronin', 'metamask', 'binance'])
  type: WalletType;
}

export class RoninCreateBatchDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsArray()
  @ValidateNested()
  @Type(() => RoninCreateDto)
  wallet: RoninCreateDto[];
}

export class GuestRoninWalletDto {
  @IsArray()
  @ValidateNested()
  @Type(() => RoninCreateDto)
  wallet: RoninCreateDto[];
}
