import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HttpService } from '../_core/http-service/http.service';
import { ApiName } from './enum/ApiName.enum';
import { RoninWallet } from './ronin.wallet.entity';
import { RoninCreateDto } from './dto/ronin.create.dto';

@Injectable()
export class CryptoService {
  private roninUrl = 'https://explorer.roninchain.com/api/';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(RoninWallet)
    private readonly roninWalletRepository: Repository<RoninWallet>,
  ) {
    //
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
