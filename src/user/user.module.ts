import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserSetting } from './user-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
