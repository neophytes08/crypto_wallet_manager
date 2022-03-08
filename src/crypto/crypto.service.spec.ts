import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { HttpServiceModule } from '../_core/http-service/http.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoninWallet } from './ronin.wallet.entity';
import { HttpService } from '../_core/http-service';
import { AXIOS_INSTANCE_TOKEN } from '../_core/http-service/http.constant';
import Axios from 'axios';

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
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
