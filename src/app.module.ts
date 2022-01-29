import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { EmployeeModule } from '@employee/employee.module';
import { config as ormConfig } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { DeviceModule } from './device/device.module';
import { HttpServiceModule } from "@core/http.service";
import { CryptoModuleController } from './crypto-module/crypto-module.controller';
import { CryptoModuleModule } from './crypto-module/crypto-module.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmployeeModule,
    TypeOrmModule.forRoot(ormConfig),
    RefreshTokenModule,
    DeviceModule,
    HttpServiceModule,
    CryptoModuleModule
  ],
  controllers: [AppController, CryptoModuleController],
  providers: [],
})
export class AppModule {}
