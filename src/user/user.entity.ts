import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from '@core/enum';
import { classToPlain, Exclude } from 'class-transformer';
import { Device } from '@device/device.entity';
import { RefreshToken } from '@refresh-token/refresh-token.entity';
import { Wallet } from '@crypto/wallet.entity';
import { Activity } from '@activity/activity.entity';
import { UserSetting } from './user-setting.entity';
import { Employee } from '@employee/employee.entity';

@Entity('user')
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column()
  googleId: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  @Exclude()
  type: UserType;

  @Column({ nullable: true })
  @Exclude()
  salt: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  validatePassword(password: string): boolean {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

  /**
   * relationships
   */

  @OneToMany(() => Device, (device) => device.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  devices: Device[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  refreshToken: RefreshToken[];

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToMany(() => Activity, (activity) => activity.owner, {
    cascade: ['insert', 'update', 'remove'],
  })
  owner?: Activity[];

  @OneToMany(() => Activity, (activity) => activity.editor, {
    cascade: ['insert', 'update', 'remove'],
  })
  editor?: Activity[];

  @OneToOne(() => UserSetting, (userSetting) => userSetting.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  setting: UserSetting;

  @OneToOne(() => Employee, (employeeUser) => employeeUser.user)
  employeeUser: Employee;

  toJSON() {
    return classToPlain(this);
  }
}
