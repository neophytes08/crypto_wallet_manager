import { ApiProperty } from "@nestjs/swagger";
import { ActivityDto } from "./activity.dto";

export class ActivityListDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [ActivityDto] })
  data: ActivityDto[];
}
