import * as HttpAdapter from '../HttpAdapter'

type FetchFunction = typeof fetch

export class FetchHttpAdapter implements HttpAdapter.Adapter {
  fetch: FetchFunction

  constructor (fetch: FetchFunction) {
    this.fetch = fetch
  }

  async request (options: HttpAdapter.Request): Promise<HttpAdapter.Response> {
    const { url, method, headers, body } = options
    const response = await this.fetch(url, { method, headers, body })
    return {
      status: response.status,
      body: await response.text(),
      headers: this.extractResponseHeaders(response)
    }
  }

  private extractResponseHeaders (response: Response) {
    const headers: { [ley: string]: string } = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })
    return headers
  }
}
