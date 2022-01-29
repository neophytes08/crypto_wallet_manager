import { AxiosRequestConfig } from "axios";
import { IAxiosRetryConfig } from "axios-retry";

export type THttpModuleOptions = AxiosRequestConfig & IAxiosRetryConfig;

export interface IHttpModuleOptionsFactory {
  createHttpOptions(): Promise<THttpModuleOptions> | THttpModuleOptions;
}
