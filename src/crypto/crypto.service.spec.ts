import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { HttpServiceModule } from "../_core/http-service/http.module";

describe('CryptoModuleService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpServiceModule],
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
