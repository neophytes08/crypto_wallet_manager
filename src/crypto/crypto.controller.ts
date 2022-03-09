import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoninCreateBatchDto } from './dto/ronin.create.dto';
import { CurrentUser } from '@core/decorator';
import { CurrUser } from '@core/interface';
import { RoninWallet } from './ronin.wallet.entity';
import { RoninQueryDto } from './dto/ronin.query.dto';
import { RoninWalletLists } from './dto/ronin-list.dto';
import { HttpService } from '@core/http.service';
import { getCoinBalance } from '@core/utils';
import { CryptoBalanceDetails } from './dto/cryptop-balance.dto';
import * as btoa from 'btoa';
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserActivity } from '@core/enum';

@ApiTags('Crypto')
@Controller({ path: 'crypto', version: 'v1' })
export class CryptoController {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {
    //
  }

  @Post('wallet/ronin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async createRoninWallet(
    @CurrentUser() user: CurrUser,
    @Body() { wallet }: RoninCreateBatchDto,
  ): Promise<HttpStatus> {
    const wallets: RoninWallet[] = [];

    for await (const data of wallet) {
      const ronin = Object.assign(new RoninWallet(), {
        user: user,
        name: data.name,
        address: data.address,
      });
      wallets.push(ronin);
    }

    await this.cryptoService.createRoninWallet(wallets);

    this.eventEmitter.emit("ronin-create-wallet.success", {
      activity: {
        owner: user,
        editor: user,
        origin: "WEB",
        details: UserActivity.RONIN_CREATED_WALLET,
      },
    });

    return HttpStatus.CREATED;
  }

  @Get('wallet/ronin')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRoninWallet(
    @CurrentUser() user: CurrUser,
    @Query() { page, limit }: RoninQueryDto,
  ): Promise<RoninWalletLists> {
    const offset = page * limit;
    return await this.cryptoService.getRoninWallet(offset, limit, user.id);
  }

  @Get('wallet/ronin/balance')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getRoninWalletBalance(
    @CurrentUser() user: CurrUser,
  ): Promise<CryptoBalanceDetails> {
    let balanceAxs = 0;
    let balanceSlp = 0;
    let balanceEth = 0;
    const headersRequest = {
      Authorization: `Basic ${btoa(process.env.COVALENT_API_KEY)}`,
    };
    const results = await this.cryptoService.getUserRoninWallet(user.id);

    for await (const result of results) {
      const baseUrl = `https://api.covalenthq.com/v1/2020/address/${result.address}/balances_v2/`;
      const data = await this.httpService.get(
        baseUrl,
        {},
        { headers: headersRequest },
      );
      balanceAxs += getCoinBalance(data.data.data.items, 'AXS');
      balanceSlp += getCoinBalance(data.data.data.items, 'SLP');
      balanceEth += getCoinBalance(data.data.data.items, 'WETH');
    }

    return {
      balance: {
        axs: balanceAxs,
        slp: balanceSlp,
        eth: balanceEth,
      },
    };
  }
}
