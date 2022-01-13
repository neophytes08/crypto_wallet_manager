import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '@user/user.entity';
import { DeviceStatus } from '@core/enum';
import { RefreshToken } from '@refresh-token/refresh-token.entity';

@Entity('device')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceType: string;

  @Column()
  os: string;

  @Column()
  osVersion: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column()
  modelVersion: string;

  @Column()
  uuid: string;

  @Column()
  registrationToken: string;

  @Column()
  ipAddress: string;

  @Column()
  source: string;

  @Column()
  browser: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({ default: DeviceStatus.ACTIVE })
  status: string;

  /**
   * relationships
   */
  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.device, {
    cascade: ['insert', 'update', 'remove'],
  })
  refreshToken: RefreshToken[];
}
