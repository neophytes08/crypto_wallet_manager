import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
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
  @IsArray()
  @ValidateNested()
  @Type(() => RoninCreateDto)
  wallet: RoninCreateDto[];
}
