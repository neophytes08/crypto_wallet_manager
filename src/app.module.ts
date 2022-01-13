import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { EmployeeModule } from '@employee/employee.module';
import { config as ormConfig } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmployeeModule,
    TypeOrmModule.forRoot(ormConfig),
    RefreshTokenModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
