import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { HttpServiceModule } from '../_core/http-service';

@Module({
  imports: [
    HttpServiceModule.register({
      timeout: 10000,
      maxRedirects: 5,
      retries: 5,
    }),
  ],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
