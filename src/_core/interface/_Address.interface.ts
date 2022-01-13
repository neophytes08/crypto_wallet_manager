import { IsNotEmpty, Length, IsString } from 'class-validator';

export class Address {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  barangay: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 5)
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
