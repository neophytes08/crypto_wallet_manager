import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CurrUser } from '@core/interface';
import { CurrentUser } from '@core/decorator';
import { UserInfoDto } from './dto/user-info.dto';
import { UserSettingUpdateDto } from './dto/user-setting.update.dto';
import { UserCoinCreate } from './dto/user.coin.create.dto';
import { UserActivity } from '@core/enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCoin } from './user.coin.entity';
import { CoinLists } from './dto/coin.lists.dto';
import { UserCoinDeleteParam } from './dto/coid.delete.dto';

@ApiTags('User')
@Controller({ path: 'user', version: 'v1' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {
    //
  }

  @Get('me')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentUser() user: CurrUser): Promise<UserInfoDto> {
    return await this.userService.getUserById(user.id);
  }

  @Patch('me/settings')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async updateMeSettings(
    @CurrentUser() user: CurrUser,
    @Body() data: UserSettingUpdateDto,
  ): Promise<HttpStatus> {
    await this.userService.updateUserSetting(user.id, data);
    return HttpStatus.NO_CONTENT;
  }

  @Post('coins')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async saveUserCoins(
    @CurrentUser() user: CurrUser,
    @Body() { coin_id }: UserCoinCreate,
  ): Promise<HttpStatus> {
    const payload = Object.assign(new UserCoin(), {
      user_id: user.id,
      coin_id: coin_id,
    });

    const result = await this.userService.createUserCoin(payload);

    if (!result)
      throw new BadRequestException(`value ${coin_id} already exists`);

    this.eventEmitter.emit('user-coin-create.success', {
      activity: {
        owner: user,
        editor: user,
        origin: 'WEB',
        details: UserActivity.USER_COIN_CREATE,
      },
    });

    return HttpStatus.CREATED;
  }

  @Get('coins')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserCoins(@CurrentUser() user: CurrUser): Promise<CoinLists> {
    return await this.userService.getCoinsByUserId(user.id);
  }

  @Delete('coins/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteUserCoins(
    @CurrentUser() user: CurrUser,
    @Param() { id }: UserCoinDeleteParam,
  ): Promise<HttpStatus> {
    await this.userService.deleteUserCoin(id, user.id);

    this.eventEmitter.emit('user-coin-delete.success', {
      activity: {
        owner: user,
        editor: user,
        origin: 'WEB',
        details: UserActivity.USER_COIN_DELETE,
      },
    });

    return HttpStatus.NO_CONTENT;
  }
}
