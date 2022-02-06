import * as HttpAdapter from '../HttpAdapter'
import * as Errors from './Errors'
import { Document } from './Specification'
import { Result } from './Results'

export class Client {
  httpAdapter: HttpAdapter.Adapter

  constructor (httpAdapter: HttpAdapter.Adapter) {
    this.httpAdapter = httpAdapter
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetch (url: string): Promise<Result<Document.FetchResponse>> {
    return await this.requestFetchData<Document.FetchResponse>(
      url,
      Document.TypeGuards.isFetchResponse
    )
  }

  async fetchResource (url: string): Promise<Result<Document.FetchResourceResponse>> {
    return await this.requestFetchData<Document.FetchResourceResponse>(
      url,
      Document.TypeGuards.isFetchResourceResponse
    )
  }

  async fetchResourceIndividual (url: string): Promise<Result<Document.FetchResourceIndividualResponse>> {
    return await this.requestFetchData<Document.FetchResourceIndividualResponse>(
      url,
      Document.TypeGuards.isFetchResourceIndividualResponse
    )
  }

  async fetchResourceCollection (url: string): Promise<Result<Document.FetchResourceCollectionResponse>> {
    return await this.requestFetchData<Document.FetchResourceCollectionResponse>(
      url,
      Document.TypeGuards.isFetchResourceCollectionResponse
    )
  }

  async fetchRelationship (url: string): Promise<Result<Document.FetchRelationshipResponse>> {
    return await this.requestFetchData<Document.FetchRelationshipResponse>(
      url,
      Document.TypeGuards.isFetchRelationshipResponse
    )
  }

  async fetchRelationshipToOne (url: string): Promise<Result<Document.FetchRelationshipToOneResponse>> {
    return await this.requestFetchData<Document.FetchRelationshipToOneResponse>(
      url,
      Document.TypeGuards.isFetchRelationshipToOneResponse
    )
  }

  async fetchRelationshipToMany (url: string): Promise<Result<Document.FetchRelationshipToManyResponse>> {
    return await this.requestFetchData<Document.FetchRelationshipToManyResponse>(
      url,
      Document.TypeGuards.isFetchRelationshipToManyResponse
    )
  }

   async createResource (url: string, document: Document.CreateResourceDocument): Promise<Result<Document.CreateResourceResponse>> {
    try {
      // Clients that include the JSON:API media type in their Accept header MUST
      // specify the media type there at least once without any media type parameters.
      const request = {
        url,
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify(document)
      }

      const response = await this.request(request)
      switch (response.status) {
        case 201:
          // TODO: If the resource object returned by the response contains a self key in its links member and a Location header
          // is provided, the value of the self member MUST match the value of the Location header.
          return {
            isSuccess: true,
            document: this.parseDocumentFromResponse<Document.FetchResourceIndividualResponse>(
              request,
              response,
              Document.TypeGuards.isFetchResourceIndividualResponse
            ),
            request,
            response
          }
        case 202:
          // If a request to create a resource has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          // TODO: Should we add an attribute "accepted" or "isProcessed" (in this case false)?
          return { isSuccess: true, document: null, request, response }
        case 204:
          // If a POST request did include a Client-Generated ID and the requested resource has been created successfully, the server MUST return either a 201 Created status code and response document (as described above) or a 204 No Content status code with no response document.
          // Note: If a 204 response is received the client should consider the resource object sent in the request to be accepted by the server, as if the server had returned it back in a 201 response.
          // TODO: Return document from request into response?.
          if (document.data?.id) {
            return { isSuccess: true, document: null, request, response }
          }
          break
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Document.ErrorDocument>(
          request,
          response,
          Document.TypeGuards.isErrorDocument
        ),
        request,
        response
      }
    } catch (error) {
      if (!(error instanceof Errors.JsonApiError)) {
        throw error
      }

      return {
        isSuccess: false,
        document: null,
        response: error.response,
        request: error.request
      }
    }
  }

   async createRelationshipToMany (url: string, document: Document.UpdateRelationshipToManyDocument): Promise<Result<Document.UpdateRelationshipToManyResponse>> {
    return await this.requestUpdateRelationshipToMany(
      url,
      'POST',
      document
    )
  }

  async updateResource (url: string, document: Document.UpdateResourceDocument): Promise<Result<Document.UpdateResourceResponse>> {
    try {
      // Clients that include the JSON:API media type in their Accept header MUST
      // specify the media type there at least once without any media type parameters.
      const request = {
        url,
        method: 'PATCH',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify(document)
      }

      let resultDocument
      const response = await this.request(request)
      switch (response.status) {
        case 200:
          resultDocument = this.parseJsonFromResponse(response)
          // If a server accepts an update but also changes the resource(s) in ways other than those specified by the request (for example, updating the updated-at attribute or a computed sha), it MUST return a 200 OK response. The response document MUST include a representation of the updated resource(s) as if a GET request was made to the request URL.
          if (Document.TypeGuards.isFetchResourceIndividualResponse(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          // A server MUST return a 200 OK status code if an update is successful, the client’s current fields remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated resource(s).
          if (Document.TypeGuards.isMetaDocument(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          break
        case 202:
          // If an update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          // TODO: Should we add an attribute "accepted" or "isProcessed" (in this case false)?
          return { isSuccess: true, document: null, request, response }
        case 204:
          // If an update is successful and the server doesn’t update any fields besides those provided, the server MUST return either a 200 OK status code and response document (as described above) or a 204 No Content status code with no response document.
          // TODO: Return document from request into response?.
          return { isSuccess: true, document: null, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Document.ErrorDocument>(
          request,
          response,
          Document.TypeGuards.isErrorDocument
        ),
        request,
        response
      }
    } catch (error) {
      if (!(error instanceof Errors.JsonApiError)) {
        throw error
      }

      return {
        isSuccess: false,
        document: null,
        response: error.response,
        request: error.request
      }
    }
  }

  async updateRelationshipToOne (url: string, document: Document.UpdateRelationshipToOneDocument): Promise<Result<Document.UpdateRelationshipToOneResponse>> {
    try {
      // Clients that include the JSON:API media type in their Accept header MUST
      // specify the media type there at least once without any media type parameters.
      const request = {
        url,
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        },
        method: 'PATCH',
        body: JSON.stringify(document)
      }
      let resultDocument
      const response = await this.request(request)
      switch (response.status) {
        case 200:
          resultDocument = this.parseJsonFromResponse(response)
          // If a server accepts an update but also changes the targeted relationship(s) in other ways than those specified by the request, it MUST return a 200 OK response. The response document MUST include a representation of the updated relationship(s).
          if (Document.TypeGuards.isFetchRelationshipToOneResponse(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          // A server MUST return a 200 OK status code if an update is successful, the client’s current data remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated relationship(s).
          if (Document.TypeGuards.isMetaDocument(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          break
        case 202:
          // If a relationship update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          return { isSuccess: true, document: null, request, response }
        case 204:
          // A server MUST return a 204 No Content status code if an update is successful and the representation of the resource in the request matches the result.
          return { isSuccess: true, document: null, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Document.ErrorDocument>(
          request, response, Document.TypeGuards.isErrorDocument
        ),
        request,
        response
      }
    } catch (error) {
      if (!(error instanceof Errors.JsonApiError)) {
        throw error
      }

      return {
        isSuccess: false,
        document: null,
        response: error.response,
        request: error.request
      }
    }
  }

  async updateRelationshipToMany (url: string, document: Document.UpdateRelationshipToManyDocument): Promise<Result<Document.UpdateRelationshipToManyResponse>> {
    return await this.requestUpdateRelationshipToMany(
      url,
      'PATCH',
      document
    )
  }

  async deleteResource (url: string): Promise<Result<Document.DeleteResourceResponse>> {
    try {
      // Clients that include the JSON:API media type in their Accept header MUST
      // specify the media type there at least once without any media type parameters.
      const request = {
        url,
        method: 'DELETE',
        headers: {
          'Accept': 'application/vnd.api+json'
        },
        body: null
      }

      const response = await this.request(request)
      switch (response.status) {
        case 200:
          // A server MUST return a 200 OK status code if a deletion request is successful and the server responds with only top-level meta data.
          return {
            isSuccess: true,
            document: this.parseDocumentFromResponse<Document.MetaDocument>(
              request,
              response,
              Document.TypeGuards.isMetaDocument
            ),
            request,
            response
          }
        case 202:
          // If a deletion request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          // TODO: Should we add an attribute "accepted" or "isProcessed" (in this case false)?
          return { isSuccess: true, document: null, request, response }
        case 204:
          // A server MUST return a 204 No Content status code if a deletion request is successful and no content is returned.
          return { isSuccess: true, document: null, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Document.ErrorDocument>(
          request,
          response,
          Document.TypeGuards.isErrorDocument
        ),
        request,
        response
      }
    } catch (error) {
      if (!(error instanceof Errors.JsonApiError)) {
        throw error
      }

      return {
        isSuccess: false,
        document: null,
        response: error.response,
        request: error.request
      }
    }
  }

   async deleteRelationshipToMany (url: string, document: Document.UpdateRelationshipToManyDocument): Promise<Result<Document.UpdateRelationshipToManyResponse>> {
    return await this.requestUpdateRelationshipToMany(
      url,
      'DELETE',
      document
    )
  }

  private async requestFetchData<D> (url: string, typeGuard: (o: any) => o is D): Promise<Result<D>> {
    try {
      // Clients that include the JSON:API media type in their Accept header MUST
      // specify the media type there at least once without any media type parameters.
      const request = {
        url,
        headers: {
          'Accept': 'application/vnd.api+json'
        },
        method: 'GET',
        body: null
      }
      const response = await this.request(request)
      switch (response.status) {
        case 200:
          return {
            isSuccess: true,
            document: this.parseDocumentFromResponse<D>(
              request, response, typeGuard
            ),
            request,
            response
          }
        default:
          return {
            isSuccess: false,
            document: this.parseDocumentFromResponse<Document.ErrorDocument>(
              request, response, Document.TypeGuards.isErrorDocument
            ),
            request,
            response
          }
      }
    } catch (error) {
      if (!(error instanceof Errors.JsonApiError)) {
        throw error
      }

      return {
        isSuccess: false,
        document: null,
        response: error.response,
        request: error.request
      }
    }
  }

  private async requestUpdateRelationshipToMany (url: string, method: string, document: any): Promise<Result<Document.UpdateRelationshipToManyResponse>> {
    try {
      // Clients that include the JSON:API media type in their Accept header MUST
      // specify the media type there at least once without any media type parameters.
      const request = {
        url,
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        },
        method,
        body: JSON.stringify(document)
      }
      let resultDocument
      const response = await this.request(request)
      switch (response.status) {
        case 200:
          resultDocument = this.parseJsonFromResponse(response)
          // If a server accepts an update but also changes the targeted relationship(s) in other ways than those specified by the request, it MUST return a 200 OK response. The response document MUST include a representation of the updated relationship(s).
          if (Document.TypeGuards.isFetchRelationshipToManyResponse(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          // A server MUST return a 200 OK status code if an update is successful, the client’s current data remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated relationship(s).
          if (Document.TypeGuards.isMetaDocument(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          break
        case 202:
          // If a relationship update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          return { isSuccess: true, document: null, request, response }
        case 204:
          // A server MUST return a 204 No Content status code if an update is successful and the representation of the resource in the request matches the result.
          return { isSuccess: true, document: null, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Document.ErrorDocument>(
          request, response, Document.TypeGuards.isErrorDocument
        ),
        request,
        response
      }
    } catch (error) {
      if (!(error instanceof Errors.JsonApiError)) {
        throw error
      }

      return {
        isSuccess: false,
        document: null,
        response: error.response,
        request: error.request
      }
    }
  }

   private parseDocumentFromResponse<Document> (
    request: HttpAdapter.Request,
    response: HttpAdapter.Response,
    typeGuard: (o: any) => o is Document
  ): Document {
    const document: Document = this.parseJsonFromResponse(response)
    if (document && typeGuard(document)) {
      return document
    }
    // TODO: Add the name of the document expected in the error.
    throw new Errors.JsonApiError(request, response, 'Invalid response body')
  }

  private parseJsonFromResponse (response: HttpAdapter.Response): any {
    if (response.body) {
      try {
        return JSON.parse(response.body)
      } catch (error) {
        return null
      }
    }
    return null
  }

  /**
   * Make HTTP request on the {@link httpAdapter} and ensure the response media type is valid.
   * @param request
   * @returns
   */
  private async request (request: HttpAdapter.Request): Promise<HttpAdapter.Response> {
    const response = await this.httpAdapter.request(request)
    if (!this.validateResponseMediaType(response)) {
      throw new Errors.JsonApiError(request, response, 'Invalid response media type')
    }
    return response
  }

  /**
   * Validate the response media type.
   * Clients MUST ignore any parameters for the "application/vnd.api+json" media type received in the "Content-Type" header of response documents.
   * @param response
   * @returns
   * @see {@link https://jsonapi.org/format/#content-negotiation-clients}
   */
  private validateResponseMediaType (response: HttpAdapter.Response) {
    if (response.body && response.body.trim().length > 0) {
      const contentType = response.headers['Content-Type'] || response.headers['content-type']
      if (!contentType || contentType.indexOf('application/vnd.api+json') !== 0) {
        return false
      }
    }
    return true
  }
}
