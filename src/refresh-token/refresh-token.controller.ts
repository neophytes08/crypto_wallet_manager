import { Controller, ForbiddenException, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cookies } from '@core/decorator';
import { decrypt, isJwtExpired } from '@core/utils';
import { EnvType } from '@core/enum';
import { RefreshTokenService } from './refresh-token.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Refresh Token')
@Controller({ path: 'refresh-token', version: 'v1' })
export class RefreshTokenController {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private jwtService: JwtService,
  ) {
    //
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Cookies('hob_datr') refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw new ForbiddenException('Your session has expired');
    }

    const [iv, content] = refreshToken.split('.');
    const jwtToken = decrypt({ iv, content });

    const decoded = <{ iat: number; exp: number }>(
      this.jwtService.decode(jwtToken)
    );

    if (isJwtExpired(decoded.exp)) {
      throw new ForbiddenException('Your session has expired');
    }

    const data = await this.refreshTokenService.getRefreshToken(refreshToken);

    if (!data || !data.user) {
      throw new ForbiddenException('Your session has expired');
    }

    return {
      accessToken: this.jwtService.sign({
        id: data.user.id,
        googleId: data.user.googleId,
        type: data.user.type,
        env: process.env.NODE_ENV || EnvType.DEV,
      }),
    };
  }
}
