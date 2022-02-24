import * as HttpAdapter from '../HttpAdapter';

type FetchFunction = typeof fetch;

/**
 * {@link HttpAdapter.Adapter} using {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|Fetch API} for make HTTP requests.
 */
export class FetchHttpAdapter implements HttpAdapter.Adapter {
  /**
   * The {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|Fetch API} function.
   */
  fetch: FetchFunction;

  /**
   * The default request `init` options to apply on each request.
   */
  defaultInit?: RequestInit;

  /**
   * Create an fetch HTTP adapter.
   * @param fetch - The {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API|Fetch API} function.
   * @param defaultInit - The default request `init` options to apply on each request.
   */
  constructor(fetch: FetchFunction, defaultInit?: RequestInit) {
    this.fetch = fetch;
    this.defaultInit = defaultInit;
  }

  /**
   * @see {@link HttpAdapter.Adapter.request}
   * @param options
   * @returns
   */
  async request(
    options: HttpAdapter.AdapterRequest
  ): Promise<HttpAdapter.AdapterResponse> {
    const { url } = options;
    const init = this.buildRequestInit(options);
    const response = await this.fetch(url, init);
    return {
      status: response.status,
      body: await response.text(),
      headers: this.extractResponseHeaders(response)
    };
  }

  private buildRequestInit(options: HttpAdapter.AdapterRequest): RequestInit {
    const { method, headers, body } = options;
    let init: RequestInit = { method, headers, body };
    if (this.defaultInit) {
      init = { ...this.defaultInit, ...init };
      // Merge headers.
      if (this.defaultInit.headers) {
        init.headers = { ...init.headers, ...this.defaultInit.headers };
      }
    }
    return init;
  }

  private extractResponseHeaders(response: Response) {
    const headers: { [ley: string]: string } = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return headers;
  }
}
