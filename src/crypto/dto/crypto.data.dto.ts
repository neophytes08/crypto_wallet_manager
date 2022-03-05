import { ApiProperty } from '@nestjs/swagger';

export class CryptoDataDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  tokenName: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  time: number;
}
