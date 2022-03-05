import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Inject } from '@nestjs/common';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IHttpFailedResponseCBSDto } from './dto/http-failed-response-cbs.dto';
import { AXIOS_INSTANCE_TOKEN } from './http.constant';
import { THttpModuleOptions } from './interfaces/http.interface';

@Injectable()
export class HttpService {
  constructor(
    @Inject(AXIOS_INSTANCE_TOKEN)
    private readonly instance: AxiosInstance = Axios,
  ) {}

  get<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: THttpModuleOptions,
  ): Promise<AxiosResponse<T & any>> {
    return this.instance
      .get(url, {
        params: data && data,
        validateStatus: (status) => status === HttpStatus.OK,
        ...config,
      })
      .catch((error: IHttpFailedResponseCBSDto) => {
        const err = error;
        err.origin = 'CBS';
        console.log(err);
        throw new HttpException(
          'Server is busy, please try again later',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
  }

  delete<T = any>(
    url: string,
    config?: THttpModuleOptions,
  ): Promise<AxiosResponse<T & any>> {
    return this.instance
      .delete(url, {
        validateStatus: (status) => status <= HttpStatus.TOO_MANY_REQUESTS,
        ...config,
      })
      .catch((error: IHttpFailedResponseCBSDto) => {
        const err = error;
        err.origin = 'CBS';
        console.log(err);
        throw new HttpException(
          'Server is busy, please try again later',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
  }

  post<T = any>(
    url: string,
    data?: Record<string, any> | any,
    config?: THttpModuleOptions,
  ): Promise<AxiosResponse<T & any>> {
    return this.instance
      .post(url, data, {
        validateStatus: (status) => status <= HttpStatus.TOO_MANY_REQUESTS,
        ...config,
      })
      .catch((error: IHttpFailedResponseCBSDto) => {
        const err = error;
        err.origin = 'CBS';
        console.log(err);
        throw new HttpException(
          'Server is busy, please try again later',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
  }

  put<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: THttpModuleOptions,
  ): Promise<AxiosResponse<T & any>> {
    return this.instance
      .put(url, data, {
        validateStatus: (status) => status <= HttpStatus.TOO_MANY_REQUESTS,
        ...config,
      })
      .catch((error: IHttpFailedResponseCBSDto) => {
        const err = error;
        err.origin = 'CBS';
        console.log(err);
        throw new HttpException(
          'Server is busy, please try again later',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
  }

  patch<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: THttpModuleOptions,
  ): Promise<AxiosResponse<T & any>> {
    return this.instance
      .patch(url, data, {
        validateStatus: (status) => status <= HttpStatus.TOO_MANY_REQUESTS,
        ...config,
      })
      .catch((error: IHttpFailedResponseCBSDto) => {
        const err = error;
        err.origin = 'CBS';
        console.log(err);
        throw new HttpException(
          'Server is busy, please try again later',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      });
  }

  checkStatus<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: THttpModuleOptions,
  ): Promise<any> {
    return this.instance
      .get(url, {
        params: data && data,
        validateStatus: (status) => status === HttpStatus.OK,
        ...config,
      })
      .catch((error: IHttpFailedResponseCBSDto) => {
        const err = error;
        err.origin = 'CBS';
        console.log(err);
        return error;
      });
  }
}
