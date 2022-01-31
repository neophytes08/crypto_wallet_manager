import { ApiProperty } from "@nestjs/swagger";
import { CryptoDataDto } from "./crypto.data.dto";

export class CryptoListDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  data: CryptoDataDto[];
}