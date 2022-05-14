import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HttpService } from '../_core/http-service/http.service';
import { ApiName } from './enum/ApiName.enum';
import { Wallet } from './wallet.entity';
import { CoinGecko } from './coin.gecko.entity';
import { RoninCreateDto } from './dto/wallet.create.dto';

@Injectable()
export class CryptoService {
  private roninUrl = 'https://explorer.roninchain.com/api/';
  private coinGeckourl = 'https://api.coingecko.com/api/v3/';
  private analyticsTransactionUrl = process.env.NOMERA_ANALYTICS_API;

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(CoinGecko)
    private readonly coinGeckoRepository: Repository<CoinGecko>,
  ) {
    //
  }

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  // handleCronResendCbs() {
  //   this.saveCoins();
  // }

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

  async createWallet(wallets: Wallet[]) {
    for await (const wallet of wallets) {
      // check if existing else create
      const check = await this.walletRepository.findOne({
        where: {
          user: { id: wallet.user.id },
          address: wallet.address,
        },
      });

      if (!check) {
        await this.walletRepository.save(wallet);
        // send address to nomera analytics to save those transactions
        const url = `${this.analyticsTransactionUrl}/${ApiName.SAVE_TRANSACTIONS}`;
        console.log(url);
        this.httpService.post(
          url,
          { userId: wallet.user.id, address: wallet.address, type: 'ronin' },
          {
            headers: {
              'X-Access-Id': process.env.NOMERA_API_KEY,
              'X-Secret-Key': process.env.NOMERA_API_SECRET,
            },
          },
        );
      }
    }
  }

  async getWallet(
    skip: number,
    take: number,
    userId?: number,
  ): Promise<{ count: number; data: Wallet[] }> {
    const [data, count] = await this.walletRepository
      .createQueryBuilder('wallet')
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
      .orderBy('wallet.createDate', 'DESC')
      .getManyAndCount();

    return {
      count,
      data,
    };
  }

  async getUserRoninWallet(userId: number) {
    return await this.walletRepository
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
    return await this.walletRepository
      .createQueryBuilder('ronin_wallet')
      .where({
        id,
      })
      .getOne();
  }

  async updateRoninWallet(data: RoninCreateDto, id: number) {
    return await this.walletRepository.update(id, data);
  }

  async deleteRoninWallet(id: number) {
    return await this.walletRepository.delete(id);
  }
}
