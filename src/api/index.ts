import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";

export default class Api {
  private _axios: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this._axios = axios.create(config);
    this.enableDebugForDevelopment();
  }

  getUri(config?: AxiosRequestConfig): string {
    return this._axios.getUri(config);
  }

  request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this._axios.request(config);
  }

  get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._axios.get<T, R>(url, config);
  }

  options<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._axios.options(url, config);
  }

  head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._axios.head(url, config);
  }

  post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this._axios.post(url, data, config);
  }

  success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  error<T>(error: AxiosError<T>): void {
    throw error;
  }

  private enableDebugForDevelopment(): void {
    if (process.env.NODE_ENV === "development") {
      this._axios.interceptors.request.use((request) => {
        console.log("Starting Request", request.url);
        return request;
      });

      this._axios.interceptors.response.use((response) => {
        console.log("Response:", response.data);
        return response;
      });
    }
  }
}
