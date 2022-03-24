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
import { CoinGecko } from '@crypto/coin.gecko.entity';

@Entity('user_coin')
export class UserCoin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coin_id: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  /**
   * Relationships
   *
   */
  @OneToOne(() => CoinGecko, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'coin_id' })
  coin: CoinGecko;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
