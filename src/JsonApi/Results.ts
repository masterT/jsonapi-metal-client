import * as HttpAdapter from '../HttpAdapter'
import { Document } from './Specification'

export type ResultFailure = {
  isSuccess: false
  document: Document.ErrorDocument | null
  request: HttpAdapter.Request
  response: HttpAdapter.Response
}

export type ResultSuccess<D> = {
  isSuccess: true
  document: D
  request: HttpAdapter.Request
  response: HttpAdapter.Response
}

export type Result<D> =  ResultFailure | ResultSuccess<D>
