import { ApiProperty } from '@nestjs/swagger';

export class ActivityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  origin: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  createDate: string;

  @ApiProperty()
  updateDate: string;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  editorId: number;

  @ApiProperty()
  ownerName: string;

  @ApiProperty()
  editorName: string;
}
