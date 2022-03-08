import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoQueryDto } from './dto/crypto.query.dto';
import { CryptoListDto } from './dto/crypto-list.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Crypto')
@Controller({ path: 'crypto', version: 'v1' })
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {
    //
  }

  @Get('wallet')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getWallet(
    @Query() { address, page }: CryptoQueryDto,
  ): Promise<CryptoListDto> {
    return await this.cryptoService.getTransactions(address, page);
  }
}
