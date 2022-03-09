import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { EmployeeModule } from '@employee/employee.module';
import { config as ormConfig } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { DeviceModule } from './device/device.module';
import { HttpServiceModule } from './_core/http-service';
import { CryptoModule } from './crypto/crypto.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ActivityModule } from './activity/activity.module';
import { EventListenerModule } from '@core/event';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmployeeModule,
    TypeOrmModule.forRoot(ormConfig),
    RefreshTokenModule,
    DeviceModule,
    HttpServiceModule,
    CryptoModule,
    EventEmitterModule.forRoot(),
    ActivityModule,
    EventListenerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
