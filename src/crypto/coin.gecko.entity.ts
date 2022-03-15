import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('coin_list')
export class CoinGecko {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  symbol?: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
