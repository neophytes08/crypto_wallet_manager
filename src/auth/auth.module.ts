import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@core/strategy';
import { isNumberString } from 'class-validator';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// modules
import { UserModule } from '@user/user.module';
import { DeviceModule } from '@device/device.module';
import { RefreshTokenModule } from '@refresh-token/refresh-token.module';

@Module({
  imports: [
    UserModule,
    DeviceModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: isNumberString(process.env.JWT_EXPIRES)
          ? Number(process.env.JWT_EXPIRES)
          : process.env.JWT_EXPIRES,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
