import { DynamicModule, Module } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import Axios from 'axios';
import axiosRetry from 'axios-retry';
import { AXIOS_INSTANCE_TOKEN, HTTP_MODULE_ID } from './http.constant';
import { HttpService } from './http.service';
import { THttpModuleOptions } from './interfaces/http.interface';

const createAxiosRetry = (config: THttpModuleOptions) => {
  const axiosInstance = Axios.create(config);
  axiosRetry(axiosInstance, config);
  return axiosInstance;
};

@Module({
  providers: [
    HttpService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: Axios,
    },
  ],
  exports: [HttpService],
})
export class HttpServiceModule {
  static register(config: THttpModuleOptions): DynamicModule {
    return {
      module: HttpServiceModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: createAxiosRetry(config),
        },
        {
          provide: HTTP_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  //todo - define registerAsync method
}
