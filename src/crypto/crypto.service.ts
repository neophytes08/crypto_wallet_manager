import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HttpService } from '../_core/http-service/http.service';
import { ApiName } from './enum/ApiName.enum';
import { RoninWallet } from './ronin.wallet.entity';
import { CoinGecko } from './coin.gecko.entity';
import { RoninCreateDto } from './dto/ronin.create.dto';

@Injectable()
export class CryptoService {
  private roninUrl = 'https://explorer.roninchain.com/api/';
  private coinGeckourl = 'https://api.coingecko.com/api/v3/';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(RoninWallet)
    private readonly roninWalletRepository: Repository<RoninWallet>,
    @InjectRepository(CoinGecko)
    private readonly coinGeckoRepository: Repository<CoinGecko>,
  ) {
    //
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleCronResendCbs() {
    this.saveCoins();
  }

  async getTransactions(address: string, page: number) {
    const format: any = [];
    const url = `${this.roninUrl}${ApiName.TRANSACTIONS}?addr=${address}&from=${page}&size=10`;
    const result = await this.httpService.get(url);

    for await (const data of result.data.results) {
      format.push(data);
    }

    return {
      count: result.data.total,
      data: format,
    };
  }

  async createRoninWallet(wallets: RoninWallet[]) {
    for await (const wallet of wallets) {
      // check if existing else create
      const check = await this.roninWalletRepository.findOne({
        where: {
          user: { id: wallet.user.id },
          address: wallet.address,
        },
      });

      if (!check) {
        await this.roninWalletRepository.save(wallet);
      }
    }
  }

  async getRoninWallet(
    skip: number,
    take: number,
    userId?: number,
  ): Promise<{ count: number; data: RoninWallet[] }> {
    const [data, count] = await this.roninWalletRepository
      .createQueryBuilder('ronin_wallet')
      .where(
        userId
          ? {
              user: {
                id: userId,
              },
            }
          : {},
      )
      .offset(skip)
      .limit(take)
      .orderBy('ronin_wallet.createDate', 'DESC')
      .getManyAndCount();

    return {
      count,
      data,
    };
  }

  async getUserRoninWallet(userId: number) {
    return await this.roninWalletRepository
      .createQueryBuilder('ronin_wallet')
      .where({
        user: {
          id: userId,
        },
      })
      .getMany();
  }

  async getCoinLists(): Promise<{ count: number; data: CoinGecko[] }> {
    const [data, count] = await this.coinGeckoRepository
      .createQueryBuilder('coin_list')
      .getManyAndCount();

    if (count === 0) {
      this.saveCoins();
    }

    return {
      count,
      data,
    };
  }

  async saveCoins() {
    console.log('----- REMOVE AND CREATE NEW COIN GECKO RECORDS -----');
    // truncate all records
    this.coinGeckoRepository.clear();
    const formatData: any = [];

    // insert new record
    const url = `${this.coinGeckourl}${ApiName.COIN_MARKETS}?vs_currency=usd&order=market_cap_desc&per_page=250`;
    const results = await this.httpService.get(url);

    for (const result of results.data) {
      const { id, name, symbol } = result;

      formatData.push(
        Object.assign(new CoinGecko(), {
          id: id,
          name: name,
          symbol: symbol,
          details: {
            ...result,
          },
        }),
      );
    }

    return this.coinGeckoRepository.save(formatData);
  }

  async getCoinMarkets(ids: any) {
    return await this.coinGeckoRepository.find({
      where: {
        id: In(ids.ids),
      },
    });
  }

  async getRoninWalletDetails(id: number) {
    return await this.roninWalletRepository
      .createQueryBuilder('ronin_wallet')
      .where({
        id,
      })
      .getOne();
  }

  async updateRoninWallet(data: RoninCreateDto, id: number) {
    return await this.roninWalletRepository.update(id, data);
  }

  async deleteRoninWallet(id: number) {
    return await this.roninWalletRepository.delete(id);
  }
}
