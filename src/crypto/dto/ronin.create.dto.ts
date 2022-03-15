import { Type } from 'class-transformer';
import {
  IsArray,
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
