import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Duration } from 'luxon';

type RequestConfig = AxiosRequestConfig & { metadata: { startTime: Date } };
type MetadataResponse = AxiosResponse & { config: RequestConfig };

@Injectable()
export class HttpClientService {
  private readonly logger: Logger = new Logger(HttpClientService.name);
  public axiosInstance: AxiosInstance;

  constructor() {
    this.createAxiosInstance();
    this.addRequestInterceptor();
    this.addResponseInterceptor();
  }

  private createAxiosInstance(): void {
    this.axiosInstance = axios.create({
      timeout: 30 * 1000,
      transitional: {
        clarifyTimeoutError: true,
      },
    });
  }

  private addRequestInterceptor() {
    this.axiosInstance.interceptors.request.use((config: RequestConfig) => {
      config.metadata = { startTime: new Date() };
      this.logger.debug(`Sending ${config.method} request to ${config.url}...`);
      return config;
    });
  }

  private addResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: MetadataResponse) => {
        const duration = Duration.fromMillis(
          new Date().getTime() - response.config.metadata.startTime.getTime(),
        ).toHuman({ listStyle: 'short' });
        this.logger.debug(
          `[${response.status}] Successfully sent ${response.request.method} request to ${response.config.url}. (${duration})`,
        );
        return response;
      },
      (error: AxiosError) => {
        const errorCode = error.response?.status ?? error.code;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const message = error.response.data.message || error.message;
        if (errorCode < 500) {
          this.logger.warn(message);
        } else {
          this.logger.error(message);
        }
        return Promise.reject(
          new HttpException(message, error.response.status),
        );
      },
    );
  }
}
