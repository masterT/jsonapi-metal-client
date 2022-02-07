import * as HttpAdapter from '../HttpAdapter'
import { Document } from './Specification'

/**
 * Represents a failed JSON:API operation result.
 */
export type ResultFailure = {
  isSuccess: false
  document: Document.ErrorDocument | null
  request: HttpAdapter.AdapterRequest
  response: HttpAdapter.AdapterResponse
}

/**
 * Represents a succeeded JSON:API operation result.
 */
export type ResultSuccess<D> = {
  isSuccess: true
  document: D
  request: HttpAdapter.AdapterRequest
  response: HttpAdapter.AdapterResponse
}

/**
 * Represents a JSON:API operation result.
 */
export type Result<D> =  ResultFailure | ResultSuccess<D>
