import { CurrentUser } from '@core/decorator';
import { CurrUser } from '@core/interface';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivityMeQueryDto } from './dto/acitivity-me.query.dto';
import { ActivityService } from './activity.service';

@ApiTags('Activity')
@Controller({ path: 'activities', version: 'v1' })
export class ActivityController {
  constructor(private activityService: ActivityService) {
    //
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({
    description: 'Return users activities',
    status: 200,
  })
  @UseGuards(AuthGuard('jwt'))
  async getOwnActivities(
    @CurrentUser() user: CurrUser,
    @Query() data: ActivityMeQueryDto,
  ) {
    const offset = data.page * data.limit;

    return await this.activityService.getClientActivity(
      user.id,
      offset,
      data.limit,
      data.dateRange,
    );
  }
}
