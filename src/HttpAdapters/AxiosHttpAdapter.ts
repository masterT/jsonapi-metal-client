import type { AxiosInstance } from 'axios';
import * as HttpAdapter from '../HttpAdapter';

/**
 * {@link HttpAdapter.Adapter} using {@link https://github.com/axios/axios|axios} for make HTTP requests.
 */
export class AxiosHttpAdapter implements HttpAdapter.Adapter {
  /**
   * The Axios instance.
   */
  instance: AxiosInstance;

  /**
   * Create an axios HTTP adapter.
   * @param instance - The Axios instance.
   */
  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  /**
   * @see {@link HttpAdapter.Adapter.request}
   * @param options
   * @returns
   */
  async request(
    options: HttpAdapter.AdapterRequest
  ): Promise<HttpAdapter.AdapterResponse> {
    const { url, method, headers, body } = options;
    const response = await this.instance.request({
      headers,
      method,
      url,
      data: body,
      // Specify not to parse JSON as the adapter should return the raw response body.
      transitional: {
        silentJSONParsing: false,
        forcedJSONParsing: false
      }
    });
    return {
      status: response.status,
      body: response.data,
      headers: response.headers
    };
  }
}
