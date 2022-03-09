import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@user/user.service';
import { EmployeeService } from '@employee/employee.service';
import { RefreshTokenService } from '@refresh-token/refresh-token.service';
import { DeviceService } from '@device/device.service';

import { User } from '@user/user.entity';
import { Employee } from '@employee/employee.entity';
import { RefreshToken } from '@refresh-token/refresh-token.entity';
import { Device } from '@device/device.entity';
import { EventEmitterModule } from "@nestjs/event-emitter";

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES,
          },
        }),
        EventEmitterModule.forRoot(),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        EmployeeService,
        RefreshTokenService,
        DeviceService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Device),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
