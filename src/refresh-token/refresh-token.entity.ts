import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@user/user.entity';
import { Device } from '@device/device.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  rsaPublicKey: string;

  @Column()
  rsaPrivateKey: string;

  @Column()
  from: string;

  @Column()
  expiration: string;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

  /**
   * relationships
   */
  @ManyToOne(() => User, (user) => user.refreshToken)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Device, (device) => device.refreshToken)
  @JoinColumn({ name: 'deviceId' })
  device: Device;
}
