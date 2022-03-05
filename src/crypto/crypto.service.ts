import { Injectable } from '@nestjs/common';
import { HttpService } from '../_core/http-service/http.service';
import { ApiName } from './enum/ApiName.enum';
import { CryptoDataDto } from './dto/crypto.data.dto';

@Injectable()
export class CryptoService {
  private roninUrl = 'https://explorer.roninchain.com/api/';

  constructor(private readonly httpService: HttpService) {
    //
  }

  async getTransactions(address: string, page: string) {
    const format: CryptoDataDto[] = [];
    const url = `${this.roninUrl}${ApiName.TRANSACTIONS}?addr=${address}&from=${page}&size=10`;
    const result = await this.httpService.get(url);

    for await (const data of result.data.results) {
      format.push({
        amount: data.value,
        from: data.from,
        to: data.to,
        tokenName: data.token_name,
        symbol: data.token_symbol,
        time: data.timestamp,
      });
    }
    return {
      count: result.data.total,
      data: format,
    };
  }
}
