import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { HttpService, AXIOS_INSTANCE_TOKEN } from '@core/http.service';
import Axios from 'axios';
import { RoninWallet } from './ronin.wallet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CoinGecko } from './coin.gecko.entity';

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      controllers: [CryptoController],
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

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
