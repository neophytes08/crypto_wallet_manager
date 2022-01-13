import { LoginFrom } from '@core/enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {
    //
  }

  async getLoginDevice(userId: number, from: LoginFrom, deviceId: string) {
    if (from === LoginFrom.MOBILE) {
      return await this.getDeviceByUUID(userId, deviceId);
    } else {
      return await this.deviceRepository.findOne({
        where: {
          source: deviceId,
          user: { id: userId },
        },
      });
    }
  }

  async getDeviceByUUID(userId: number, uuid: string) {
    return await this.deviceRepository.findOne({
      where: {
        uuid,
        user: { id: userId },
      },
    });
  }
}
