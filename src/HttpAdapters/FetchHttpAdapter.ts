import { AbstractAdapter } from './AbstractAdapter'
import * as HttpAdapter from '../HttpAdapter'

type DefaultRequest = Pick<
  RequestInit,
  | "cache"
  | "credentials"
  | "headers"
  | "integrity"
  | "keepalive"
  | "mode"
  | "redirect"
  | "referrer"
  | "referrerPolicy"
  | "signal"
>

type FetchFunction = typeof fetch

export class FetchHttpAdapter extends AbstractAdapter<DefaultRequest> {
  fetch: FetchFunction

  constructor (fetch: FetchFunction, defaultRequest?: DefaultRequest) {
    super(defaultRequest)
    this.fetch = fetch
  }

  async request (options: HttpAdapter.Request): Promise<HttpAdapter.Response> {
    const resource = options.url
    const init = this.buildInit(options)
    const response = await this.fetch(resource, init)
    return this.buildHttpClientResponse(response)
  }

  private buildInit (options: HttpAdapter.Request) {
    return {
      ...(this.defaultRequest || {}),
      method: options.method,
      headers: {
        ...options.headers,
        ...(this.defaultRequest?.headers || {}),
      },
      body: options.body
    }
  }

  private async buildHttpClientResponse(response: Response): Promise<HttpAdapter.Response> {
    const httpClientResponse: HttpAdapter.Response = {
      status: response.status,
      body: await response.text(),
      headers: {}
    }
    response.headers.forEach((value, key) => { httpClientResponse.headers[key] = value })
    return httpClientResponse
  }
}
