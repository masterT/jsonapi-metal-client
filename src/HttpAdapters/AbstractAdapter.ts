import * as HttpAdapter from '../HttpAdapter'

export abstract class AbstractAdapter<T> implements HttpAdapter.Adapter {
  defaultRequest?: T

  constructor (defaultRequest?: T) {
    this.defaultRequest = defaultRequest
  }

  abstract request(options: HttpAdapter.Request): Promise<HttpAdapter.Response>
}
