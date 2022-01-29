import { Module } from '@nestjs/common';
import { CryptoModuleService } from './crypto-module.service';
import { HttpServiceModule } from "@core/http.service";

@Module({
  imports: [
    HttpServiceModule.register({
      timeout: 10000,
      maxRedirects: 5,
      retries: 5,
    }),
  ],
  providers: [CryptoModuleService],
  exports: [CryptoModuleService],
})
export class CryptoModuleModule {}
