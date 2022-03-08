import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Ip,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '@user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResDto } from './dto/login.dto';
import { isEmail } from 'class-validator';
import { cookieOptions, encrypt } from '@core/utils';
import { RefreshTokenService } from '@refresh-token/refresh-token.service';
import { DeviceService } from '@device/device.service';
import { EnvType, LoginFrom, UserType } from '@core/enum';
import * as useragent from 'express-useragent';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private refTokenService: RefreshTokenService,
    private deviceService: DeviceService,
  ) {
    //
  }

  @Post('login')
  @HttpCode(200)
  async login(
    // @Headers('user-agent') userAgent: string,
    @Headers('from') from: LoginFrom,
    // @Headers('device-id') deviceId: string,
    @Ip() ipAddress: string,
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResDto> {
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

  // @Get('password-reset')
  // @HttpCode(200)
  // async passwordReset(): Promise<any> {
  //   return "password-reset"
  // }
}
