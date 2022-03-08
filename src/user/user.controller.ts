import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CurrUser } from '@core/interface';
import { CurrentUser } from '@core/decorator';
import { UserInfoDto } from './dto/user-info.dto';

@ApiTags('User')
@Controller({ path: 'user', version: 'v1' })
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }

  @Get('me')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentUser() user: CurrUser): Promise<UserInfoDto> {
    return await this.userService.getUserById(user.id);
  }
}
