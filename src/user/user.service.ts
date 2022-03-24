import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserSetting } from './user-setting.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from '@core/enum';
import { UserCoin } from './user.coin.entity';
import { UserCoinData } from './dto/coin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>,
    @InjectRepository(UserCoin)
    private readonly userCoinRepository: Repository<UserCoin>,
  ) {
    //
  }

  async loginOrSignUp(data: any) {
    const checkUser = await this.userRepository.findOne({
      googleId: data.googleId,
    });

    if (checkUser) return checkUser;

    // create new record for user
    const salt = bcrypt.genSaltSync(10);
    const user = Object.assign(new User(), {
      ...data,
      type: UserType.CLIENT,
      salt,
      password: null,
    });
    try {
      const userData = await this.userRepository.save(user);
      const settings = Object.assign(new UserSetting(), {
        user: userData,
        options: {
          isBiometricEnabled: false,
          isDarkModeEnabled: false,
          defaultCurrency: 'PHP',
        },
      });
      await this.userSettingRepository.save(settings);
      return userData;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findLoginUser(email: string, isEmail: boolean) {
    let user: User = null;

    if (isEmail) {
      user = await this.getUserByEmail(email);
    } else {
      user = await this.getUserByUsername(email);
    }

    return user;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      relations: ['setting'],
      where: { id },
    });
  }

  async updateUserSetting(
    userId: number,
    options: {
      isBiometricEnabled?: boolean;
      isDarkModeEnabled?: boolean;
      defaultCurrency: string;
    },
  ) {
    return await this.userSettingRepository.update(
      { user: { id: userId } },
      {
        options,
      },
    );
  }

  async createUserCoin(payload: UserCoin) {
    const result = await this.userCoinRepository.findOne({
      where: {
        user_id: payload.user_id,
        coin_id: payload.coin_id,
      },
    });

    return !result ? await this.userCoinRepository.save(payload) : false;
  }

  async getCoinsByUserId(
    user_id: number,
  ): Promise<{ count: number; data: UserCoinData[] }> {
    const results = await this.userCoinRepository.find({
      relations: ['coin'],
      where: {
        user_id,
      },
    });

    return {
      count: results.length,
      data: results,
    };
  }

  async deleteUserCoin(id: string, user_id: number) {
    const check = await this.userCoinRepository.findOne({
      where: {
        user_id: user_id,
        id: id,
      },
    });

    return check ? await this.userCoinRepository.delete(id) : false;
  }
}
