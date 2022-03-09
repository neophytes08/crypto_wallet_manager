import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResDto } from './dto/login.dto';
import { cookieOptions, encrypt } from '@core/utils';
import { RefreshTokenService } from '@refresh-token/refresh-token.service';
import { DeviceService } from '@device/device.service';
import { EnvType, LoginFrom, UserActivity, UserType } from '@core/enum';
import { Response } from 'express';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { loginApiHeader } from '@core/swagger';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Auth')
@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private refTokenService: RefreshTokenService,
    private deviceService: DeviceService,
    private eventEmitter: EventEmitter2,
  ) {
    //
  }

  @Post('login')
  @HttpCode(200)
  @ApiHeaders(loginApiHeader)
  async login(
    @Headers('from') from: LoginFrom,
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResDto> {
    const loginMethod = ['web', 'mobile', 'cms'].includes(from) ?? false;

    if (!loginMethod) throw new UnauthorizedException('Invalid Login method');
    const user = await this.userService.loginOrSignUp(data);

    const refreshJWTToken = this.jwtService.sign(
      {},
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '1m',
      },
    );

    const encryptedToken = encrypt(refreshJWTToken);
    const refreshToken = `${encryptedToken.iv}.${encryptedToken.content}`;

    await this.refTokenService.createRefreshToken(
      user.id,
      null,
      refreshToken,
      from,
    );

    this.eventEmitter.emit('login.success', {
      activity: {
        owner: user,
        editor: user,
        origin: from.toUpperCase(),
        details: UserActivity.LOGIN,
      },
    });

    res.cookie('hob_datr', refreshToken, cookieOptions);
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        googleId: data.googleId,
        env: process.env.NODE_ENV || EnvType.DEV,
        type: UserType.CLIENT,
      }),
    };
  }
}
