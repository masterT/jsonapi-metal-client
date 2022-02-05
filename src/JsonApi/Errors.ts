import * as HttpAdapter from '../HttpAdapter'

export class JsonApiError extends Error {
  request: HttpAdapter.Request
  response: HttpAdapter.Response

  constructor(request: HttpAdapter.Request, response: HttpAdapter.Response, message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.request = request
    this.response = response
  }
}

// export class JsonApiErrorInvalidResponseMediaType extends JsonApiError {
//   request: HttpAdapter.Request
//   response: HttpAdapter.Response

//   constructor(request: HttpAdapter.Request, response: HttpAdapter.Response) {
//     super('Invalid response media type')
//     Object.setPrototypeOf(this, new.target.prototype)
//     this.request = request
//     this.response = response
//   }
// }

// export class JsonApiErrorInvalidResponseBody extends JsonApiError {
//   request: HttpAdapter.Request
//   response: HttpAdapter.Response

//   constructor(request: HttpAdapter.Request, response: HttpAdapter.Response) {
//     super('Invalid response body')
//     Object.setPrototypeOf(this, new.target.prototype)
//     this.request = request
//     this.response = response
//   }
// }
