import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { extractServiceErrorMessage } from '../utils/error';

class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL?: string, withCredentials = false) {
    if (baseURL === undefined) {
      throw new Error('Base URL must be defined.');
    }

    this.instance = axios.create({
      baseURL,
      withCredentials, // Set true for cookie authentication
    });

    this._initializeResponseInterceptor();
  }

  public getInstance() {
    return this.instance;
  }

  protected _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (err: any) =>
    Promise.reject(extractServiceErrorMessage(err));
}

export { HttpClient };
