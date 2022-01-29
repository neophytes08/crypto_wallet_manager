export interface IHttpFailedResponseCBSDto {
  message?: string;
  name?: string;
  stack?: string;
  config?: IConfig;
  code?: string;
  status?: null;
  origin?: string;
}

export interface IConfig {
  transitional?: ITransitional;
  transformRequest?: null[];
  transformResponse?: null[];
  timeout?: number;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: number;
  maxBodyLength?: number;
  headers?: IAxiosRetry;
  maxRedirects?: number;
  retries?: number;
  method?: string;
  url?: string;
  "axios-retry"?: IAxiosRetry;
}

export interface IAxiosRetry {
  retryCount?: number;
  lastRequestTime?: number;
}

export interface IHeaders {
  Accept?: string;
  "User-Agent"?: string;
}

export interface ITransitional {
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
}
