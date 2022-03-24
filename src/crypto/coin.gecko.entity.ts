import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserCoin } from '@user/user.coin.entity';

export class CoinDetails {
  @Column()
  image: string;

  @Column()
  current_price: number;

  @Column()
  market_cap: number;

  @Column()
  market_cap_rank: number;

  @Column()
  fully_diluted_valuation: number;

  @Column()
  total_volume: number;

  @Column()
  high_24h: number;

  @Column()
  low_24h: number;

  @Column()
  price_change_24h: number;

  @Column()
  price_change_percentage_24h: number;

  @Column()
  market_cap_change_24h: number;

  @Column()
  market_cap_change_percentage_24h: number;

  @Column()
  circulating_supply: number;

  @Column()
  total_supply: number;

  @Column()
  max_supply: number;

  @Column()
  ath: number;

  @Column()
  ath_change_percentage: number;

  @Column()
  ath_date: string;

  @Column()
  atl: number;

  @Column()
  atl_change_percentage: number;

  @Column()
  atl_date: string;

  @Column()
  roi: string;

  @Column()
  last_updated: string;
}
@Entity('coin_list')
export class CoinGecko {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column({ type: 'json' })
  details: any;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  /*
   * Relationships
   */

  @OneToOne(() => UserCoin, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id' })
  coin: UserCoin;
}
