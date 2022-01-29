import { Test, TestingModule } from '@nestjs/testing';
import { CryptoModuleService } from '@crypto-module/crypto-module.service';
import { HttpServiceModule } from "@core/http.service";

describe('CryptoModuleService', () => {
  let service: CryptoModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpServiceModule],
      providers: [CryptoModuleService],
    }).compile();

    service = module.get<CryptoModuleService>(CryptoModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
