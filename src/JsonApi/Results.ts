import * as HttpAdapter from '../HttpAdapter'
import * as Spec from './Specification'

export type ErrorResult = {
  isSuccess: false
  document?: Spec.ErrorDocument
  request: HttpAdapter.Request
  response: HttpAdapter.Response
}

export type FetchResult<T> = {
  isSuccess: true
  document: T
  request: HttpAdapter.Request
  response: HttpAdapter.Response
} | ErrorResult

export type CreateResourceResult = {
  isSuccess: true
  document?: Spec.FetchResourceIndividualResponse
  request: HttpAdapter.Request
  response: HttpAdapter.Response
} | ErrorResult

export type UpdateResourceResult = {
  isSuccess: true
  document?: Spec.FetchResourceIndividualResponse | Spec.MetaDocument
  request: HttpAdapter.Request
  response: HttpAdapter.Response
} | ErrorResult

export type UpdateRelationshipResult<T> = {
  isSuccess: true
  document?: T | Spec.MetaDocument
  request: HttpAdapter.Request
  response: HttpAdapter.Response
} | ErrorResult

export type DeleteResourceResult = {
  isSuccess: true
  document?: Spec.MetaDocument
  request: HttpAdapter.Request
  response: HttpAdapter.Response
} | ErrorResult
