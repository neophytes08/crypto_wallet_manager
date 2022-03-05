import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoQueryDto } from './dto/crypto.query.dto';
import { CryptoListDto } from './dto/crypto.list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Crypto')
@Controller({ path: 'crypto', version: 'v1' })
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {
    //
  }

  @Get('wallet')
  async getWallet(
    @Query() { address, page }: CryptoQueryDto,
  ): Promise<CryptoListDto> {
    console.log('address', address);
    return await this.cryptoService.getTransactions(address, page);
  }

  @Get('test')
  getTest() {
    return 'yeah';
  }
}
