import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserSetting } from './user-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserCoin } from './user.coin.entity';

/*
 * Modules
 */
import { CryptoModule } from '@crypto/crypto.module';

@Module({
  imports: [
    forwardRef(() => CryptoModule),
    TypeOrmModule.forFeature([User, UserSetting, UserCoin]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
