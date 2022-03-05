import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from '@core/enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      return await this.userRepository.save(user);
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
}
