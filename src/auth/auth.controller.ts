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
import { EnvType, LoginFrom } from '@core/enum';
import * as useragent from 'express-useragent';
import { Response } from 'express';

@Controller({ path: "auth", version: "v1" })
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

  // @Post('login')
  // @HttpCode(200)
  // async login(
  //   @Headers('user-agent') userAgent: string,
  //   @Headers('from') from: LoginFrom,
  //   @Headers('device-id') deviceId: string,
  //   @Ip() ipAddress: string,
  //   @Body() data: LoginDto,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<LoginResDto> {
  //   const user = await this.userService.findLoginUser(
  //     data.email,
  //     isEmail(data.email),
  //   );

  //   if (!user || !user.validatePassword(data.password)) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  //   const isClient = from === LoginFrom.MOBILE ? true : false;
  //   const { source } = useragent.parse(userAgent);

  //   const device = await this.deviceService.getLoginDevice(
  //     user.id,
  //     from,
  //     isClient ? deviceId : source,
  //   );

  //   const refreshJWTToken = this.jwtService.sign(
  //     {},
  //     {
  //       secret: process.env.REFRESH_TOKEN_SECRET,
  //       expiresIn: '1m',
  //     },
  //   );

  //   const encryptedToken = encrypt(refreshJWTToken);
  //   const refreshToken = `${encryptedToken.iv}.${encryptedToken.content}`;

  //   await this.refTokenService.createRefreshToken(
  //     user.id,
  //     device && device.ipAddress === ipAddress ? device.id : null,
  //     refreshToken,
  //     from,
  //   );

  //   res.cookie('hob_datr', refreshToken, cookieOptions);
  //   return {
  //     accessToken: this.jwtService.sign({
  //       id: user.id,
  //       email: user.email,
  //       type: user.type,
  //       env: process.env.NODE_ENV || EnvType.DEV,
  //     }),
  //   };
  // }

  // @Get('password-reset')
  // @HttpCode(200)
  // async passwordReset(): Promise<any> {
  //   return "password-reset"
  // }
  
}
