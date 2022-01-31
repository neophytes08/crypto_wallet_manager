import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { EmployeeModule } from '@employee/employee.module';
import { config as ormConfig } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { DeviceModule } from './device/device.module';
import { HttpServiceModule } from "./_core/http-service";
import { CryptoController } from './crypto/crypto.controller';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmployeeModule,
    TypeOrmModule.forRoot(ormConfig),
    RefreshTokenModule,
    DeviceModule,
    HttpServiceModule,
    CryptoModule
  ],
  controllers: [AppController, CryptoController],
  providers: [],
})
export class AppModule {}
