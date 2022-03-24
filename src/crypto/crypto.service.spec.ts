import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import {
  HttpServiceModule,
  AXIOS_INSTANCE_TOKEN,
  HttpService,
} from '@core/http.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoninWallet } from './ronin.wallet.entity';
import Axios from 'axios';
import { CoinGecko } from './coin.gecko.entity';

describe('CryptoModuleService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpServiceModule],
      providers: [
        CryptoService,
        HttpService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios,
        },
        {
          provide: getRepositoryToken(RoninWallet),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(CoinGecko),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
