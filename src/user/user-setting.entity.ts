import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_setting')
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  options: {
    isBiometricEnabled: boolean;
    isDarkModeEnabled: boolean;
    defaultCurrency: string;
  };

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  /**
   * relationships
   */
  @OneToOne(() => User, (user) => user.setting)
  @JoinColumn({ name: 'userId' })
  user: User;
}
