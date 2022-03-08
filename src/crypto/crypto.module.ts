import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HttpServiceModule } from '../_core/http-service';
import { RoninWallet } from './ronin.wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpServiceModule.register({
      timeout: 10000,
      maxRedirects: 5,
      retries: 5,
    }),
    TypeOrmModule.forFeature([RoninWallet]),
  ],
  providers: [CryptoService],
  exports: [CryptoService, TypeOrmModule],
})
export class CryptoModule {}
