import * as Spec from './Specification'
import * as HttpAdapter from '../HttpAdapter'
import * as Errors from './Errors'
import {
  FetchResult,
  CreateResourceResult,
  UpdateResourceResult,
  UpdateRelationshipResult,
  DeleteResourceResult
} from './Results'

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
  async fetch (url: string): Promise<FetchResult<Spec.FetchResponse>> {
    return await this.fetchData<Spec.FetchResponse>(
      url,
      Spec.TypeGuards.isFetchResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetchResource (url: string): Promise<FetchResult<Spec.FetchResourceResponse>> {
    return await this.fetchData<Spec.FetchResourceResponse>(
      url,
      Spec.TypeGuards.isFetchResourceResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetchResourceIndividual (url: string): Promise<FetchResult<Spec.FetchResourceIndividualResponse>> {
    return await this.fetchData<Spec.FetchResourceIndividualResponse>(
      url,
      Spec.TypeGuards.isFetchResourceIndividualResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetchResourceCollection (url: string): Promise<FetchResult<Spec.FetchResourceCollectionResponse>> {
    return await this.fetchData<Spec.FetchResourceCollectionResponse>(
      url,
      Spec.TypeGuards.isFetchResourceCollectionResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetchRelationship (url: string): Promise<FetchResult<Spec.FetchRelationshipResponse>> {
    return await this.fetchData<Spec.FetchRelationshipResponse>(
      url,
      Spec.TypeGuards.isFetchRelationshipResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetchRelationshipToOne (url: string): Promise<FetchResult<Spec.FetchRelationshipToOneResponse>> {
    return await this.fetchData<Spec.FetchRelationshipToOneResponse>(
      url,
      Spec.TypeGuards.isFetchRelationshipToOneResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async fetchRelationshipToMany (url: string): Promise<FetchResult<Spec.FetchRelationshipToManyResponse>> {
    return await this.fetchData<Spec.FetchRelationshipToManyResponse>(
      url,
      Spec.TypeGuards.isFetchRelationshipToManyResponse
    )
  }

   async createResource (url: string, document: Spec.CreateResourceDocument): Promise<CreateResourceResult> {
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
            document: this.parseDocumentFromResponse<Spec.FetchResourceIndividualResponse>(
              request,
              response,
              Spec.TypeGuards.isFetchResourceIndividualResponse
            ),
            request,
            response
          }
        case 202:
          // If a request to create a resource has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          // TODO: Should we add an attribute "accepted" or "isProcessed" (in this case false)?
          return { isSuccess: true, request, response }
        case 204:
          // If a POST request did include a Client-Generated ID and the requested resource has been created successfully, the server MUST return either a 201 Created status code and response document (as described above) or a 204 No Content status code with no response document.
          // Note: If a 204 response is received the client should consider the resource object sent in the request to be accepted by the server, as if the server had returned it back in a 201 response.
          // TODO: Return document from request into response?.
          if (document.data?.id) {
            return { isSuccess: true, request, response }
          }
          break
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Spec.ErrorDocument>(
          request,
          response,
          Spec.TypeGuards.isErrorDocument
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
        response: error.response,
        request: error.request
      }
    }
  }

  /**
   *
   * @param url
   * @param document
   * @returns
   */
   async createRelationshipToMany (url: string, document: Spec.UpdateRelationshipToManyDocument): Promise<UpdateRelationshipResult<Spec.FetchRelationshipToManyResponse>> {
    return await this.updateRelationship(
      url,
      'POST',
      document,
      Spec.TypeGuards.isFetchRelationshipToManyResponse
    )
  }

  /**
   *
   * @param url
   * @param document
   * @returns
   */
  async updateResource (url: string, document: Spec.UpdateResourceDocument): Promise<UpdateResourceResult> {
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
          if (Spec.TypeGuards.isFetchResourceIndividualResponse(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          // A server MUST return a 200 OK status code if an update is successful, the client’s current fields remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated resource(s).
          if (Spec.TypeGuards.isMetaDocument(resultDocument)) {
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
          return { isSuccess: true, request, response }
        case 204:
          // If an update is successful and the server doesn’t update any fields besides those provided, the server MUST return either a 200 OK status code and response document (as described above) or a 204 No Content status code with no response document.
          // TODO: Return document from request into response?.
          return { isSuccess: true, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Spec.ErrorDocument>(
          request,
          response,
          Spec.TypeGuards.isErrorDocument
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
        response: error.response,
        request: error.request
      }
    }
  }

  /**
   *
   * @param url
   * @param document
   * @returns
   */
  async updateRelationshipToOne (url: string, document: Spec.UpdateRelationshipToOneDocument): Promise<UpdateRelationshipResult<Spec.FetchRelationshipToOneResponse>> {
    return await this.updateRelationship(
      url,
      'PATCH',
      document,
      Spec.TypeGuards.isFetchRelationshipToOneResponse
    )
  }

  /**
   *
   * @param url
   * @param document
   * @returns
   */
  async updateRelationshipToMany (url: string, document: Spec.UpdateRelationshipToManyDocument): Promise<UpdateRelationshipResult<Spec.FetchRelationshipToManyResponse>> {
    return await this.updateRelationship(
      url,
      'PATCH',
      document,
      Spec.TypeGuards.isFetchRelationshipToManyResponse
    )
  }

  /**
   *
   * @param url
   * @returns
   */
  async deleteResource (url: string): Promise<DeleteResourceResult> {
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
            document: this.parseDocumentFromResponse<Spec.MetaDocument>(
              request,
              response,
              Spec.TypeGuards.isMetaDocument
            ),
            request,
            response
          }
        case 202:
          // If a deletion request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
          // TODO: Should we add an attribute "accepted" or "isProcessed" (in this case false)?
          return { isSuccess: true, request, response }
        case 204:
          // A server MUST return a 204 No Content status code if a deletion request is successful and no content is returned.
          return { isSuccess: true, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Spec.ErrorDocument>(
          request,
          response,
          Spec.TypeGuards.isErrorDocument
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
        response: error.response,
        request: error.request
      }
    }
  }

  /**
   *
   * @param url
   * @param document
   * @returns
   */
   async deleteRelationshipToMany (url: string, document: Spec.UpdateRelationshipToManyDocument): Promise<UpdateRelationshipResult<Spec.FetchRelationshipToManyResponse>> {
    return await this.updateRelationship(
      url,
      'DELETE',
      document,
      Spec.TypeGuards.isFetchRelationshipToManyResponse
    )
  }

  /**
   * Fetch data.
   * @param url
   * @param typeGuard
   * @returns
   * @see {@link https://jsonapi.org/format/#fetching}
   */
  private async fetchData<Document> (url: string, typeGuard: (o: any) => o is Document): Promise<FetchResult<Document>> {
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
            document: this.parseDocumentFromResponse<Document>(
              request, response, typeGuard
            ),
            request,
            response
          }
        default:
          return {
            isSuccess: false,
            document: this.parseDocumentFromResponse<Spec.ErrorDocument>(
              request, response, Spec.TypeGuards.isErrorDocument
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
        response: error.response,
        request: error.request
      }
    }
  }

  private async updateRelationship<Document> (url: string, method: string, document: any, typeGuard: (o: any) => o is Document): Promise<UpdateRelationshipResult<Document>> {
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
          if (typeGuard(resultDocument)) {
            return {
              isSuccess: true,
              document: resultDocument,
              request,
              response
            }
          }
          // A server MUST return a 200 OK status code if an update is successful, the client’s current data remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated relationship(s).
          if (Spec.TypeGuards.isMetaDocument(resultDocument)) {
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
          return { isSuccess: true, request, response }
        case 204:
          // A server MUST return a 204 No Content status code if an update is successful and the representation of the resource in the request matches the result.
          return { isSuccess: true, request, response }
      }
      return {
        isSuccess: false,
        document: this.parseDocumentFromResponse<Spec.ErrorDocument>(
          request, response, Spec.TypeGuards.isErrorDocument
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
        response: error.response,
        request: error.request
      }
    }
  }

  /**
   *
   * @param request
   * @param response
   * @returns
   */
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

  /**
   *
   * @param response
   * @returns
   */
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
   * Make HTTP request on the `httpAdapter` and ensure the response media type is valid.
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
