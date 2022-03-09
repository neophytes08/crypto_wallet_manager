import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsISO8601,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsString,
  IsOptional,
  ValidateNested,
} from "class-validator";

class DateRange {
  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  from: string;

  @IsNotEmpty()
  @IsString()
  @IsISO8601()
  to: string;
}

export class ActivityMeQueryDto {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  limit: number;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => DateRange)
  @ApiPropertyOptional({
    type: "object",
    properties: { from: { type: "string" }, to: { type: "string" } },
    default: {
      dateRange: {
        from: "2020-01-01",
        to: "2020-12-12",
      },
    },
  })
  dateRange?: DateRange;
}
