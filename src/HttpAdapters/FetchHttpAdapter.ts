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

  constructor(fetch: FetchFunction) {
    this.fetch = fetch;
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
    const response = await this.fetch(url, { method, headers, body });
    return {
      status: response.status,
      body: await response.text(),
      headers: this.extractResponseHeaders(response)
    };
  }

  private extractResponseHeaders(response: Response) {
    const headers: { [ley: string]: string } = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return headers;
  }
}
