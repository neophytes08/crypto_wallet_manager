import { Injectable } from '@nestjs/common';
import { HttpService } from "@core/http.service";

@Injectable()
export class CryptoModuleService {
  constructor(private readonly httpService: HttpService) {
    // 
  }
}
