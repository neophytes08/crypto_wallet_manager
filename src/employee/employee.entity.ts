import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Address } from '@core/interface';
import { User } from '@user/user.entity';
import { UserStatus } from '@core/enum';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  username: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  nameSuffix: string;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column()
  @Index({ unique: true })
  mobileNumber: string;

  @Column({ type: 'json' })
  presentAddress: Address;

  @Column({ type: 'json' })
  permanentAddress: Address;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  /**
   * relationships
   */

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
