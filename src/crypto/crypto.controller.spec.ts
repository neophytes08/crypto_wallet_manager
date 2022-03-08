import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { HttpService } from '../_core/http-service';
import { AXIOS_INSTANCE_TOKEN } from '../_core/http-service/http.constant';
import Axios from 'axios';
import { RoninWallet } from './ronin.wallet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
