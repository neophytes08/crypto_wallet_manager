import { LoginFrom } from '@core/enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/user.entity';
import { generateKeyPair } from '@core/utils';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { Device } from '@device/device.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {
    //
  }

  async createRefreshToken(
    userId: number,
    deviceId: number,
    token: string,
    from: LoginFrom,
  ) {
    const { publicKey: rsaPublicKey, privateKey: rsaPrivateKey } =
      generateKeyPair();

    return await this.refreshTokenRepository.save(
      Object.assign(new RefreshToken(), {
        user: Object.assign(new User(), { id: userId }),
        device: Object.assign(new Device(), { id: deviceId }),
        token,
        rsaPublicKey,
        rsaPrivateKey,
        from: from.toUpperCase(),
        expiration: '',
      }),
    );
  }

  async getRefreshToken(refreshToken: string) {
    return await this.refreshTokenRepository.findOne({
      relations: ['user'],
      where: {
        token: refreshToken,
      },
    });
  }
}
