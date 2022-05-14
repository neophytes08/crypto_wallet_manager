import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HttpServiceModule } from '@core/http.service';
import { Wallet } from './wallet.entity';
import { CoinGecko } from './coin.gecko.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoController } from './crypto.controller';

/*
 * Modules
 */

@Module({
  imports: [
    HttpServiceModule.register({
      timeout: 10000,
      maxRedirects: 5,
      retries: 5,
    }),
    TypeOrmModule.forFeature([Wallet, CoinGecko]),
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
  exports: [CryptoService, TypeOrmModule],
})
export class CryptoModule {}
