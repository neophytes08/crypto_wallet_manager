import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
  ) {
    //
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
    return this.userService.findOne({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    return this.userService.findOne({
      where: { username },
    });
  }
}
