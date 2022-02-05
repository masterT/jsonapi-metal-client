import * as dataDocumentResourceIndividualFixture from '../../fixtures/data-document/resource-individual.json'
import * as errorDocumentFixture from '../../fixtures/error-document.json'
import * as metaDocumentFixture from '../../fixtures/meta-document.json'
import { HttpAdapter, JsonApi } from '../../../src'

class HttpAdapterMock implements HttpAdapter.Adapter {
  request(options: HttpAdapter.Request): Promise<HttpAdapter.Response> {
    throw new Error('Method not implemented.');
  }
}

describe('JsonApi.Client', () => {
  let httpAdapter: HttpAdapter.Adapter
  let client: JsonApi.Client
  let requestFunction: any
  let response: HttpAdapter.Response
  let request: HttpAdapter.Request

  beforeEach(() => {
    httpAdapter = new HttpAdapterMock()
    requestFunction = jest.fn().mockImplementation(() => response)
    httpAdapter.request = requestFunction.bind(httpAdapter)
    client = new JsonApi.Client(httpAdapter)
  })

  describe('createResource', () => {
    const url = 'http://example.com/articles'
    const document = {
      "data": {
        "type": "articles",
        "attributes": {
          "title": "JSON:API paints my bikeshed!"
        },
        "relationships": {
          "author": {
            "data": {
              "type": "people",
              "id": "9"
            }
          }
        }
      }
    }

    beforeEach(() => {
      request = {
        url,
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        },
        method: 'POST',
        body: JSON.stringify(document)
      }

      response = {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Location': 'http://example.com/articles/1'
        },
        status: 201,
        body: JSON.stringify(dataDocumentResourceIndividualFixture)
      }
    })

    test('calls request on the httpAdapter', () => {
      client.createResource(url, document)

      expect(requestFunction.mock.calls.length).toBe(1)
      expect(requestFunction.mock.calls[0]).toEqual([request])
    })

    describe('when status 201', () => {
      describe('when media type is application/vnd.api+json', () => {
        describe('when body is document with individual resource', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json',
                'Location': 'http://example.com/articles/1'
              },
              status: 201,
              body: JSON.stringify(dataDocumentResourceIndividualFixture)
            }
          })

          test('resolves result success with document', async () => {
            await expect(client.createResource(url, document)).resolves.toEqual({
              isSuccess: true,
              document: dataDocumentResourceIndividualFixture,
              request,
              response
            })
          })
        })

        describe('when body is not an individual resource document', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 201,
              body: JSON.stringify(metaDocumentFixture)
            }
          })

          test('resolves not successful result without document', async () => {
            await expect(client.createResource(url, document)).resolves.toEqual({
              isSuccess: false,
              document: undefined,
              request,
              response
            })
          })
        })
      })

      describe('when media type is not application/vnd.api+json', () => {
        beforeEach(() => {
          response = {
            headers: {
              'Content-Type': 'text/html'
            },
            status: 201,
            body: '<!DOCTYPE html>'
          }
        })

        test('resolves not successful result without document', async () => {
          await expect(client.createResource(url, document)).resolves.toEqual({
            isSuccess: false,
            document: undefined,
            request,
            response
          })
        })
      })
    })

    describe('when status 202', () => {
      beforeEach(() => {
        response = {
          headers: {},
          status: 202,
          body: ''
        }
      })

      test('resolves result success without document', async () => {
        await expect(client.createResource(url, document)).resolves.toEqual({
          isSuccess: true,
          document: undefined,
          request,
          response
        })
      })
    })

    describe('when status 204', () => {
      describe('when document includes client generated ID', () => {
        const document = {
          "data": {
            "type": "articles",
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "attributes": {
              "title": "JSON:API paints my bikeshed!"
            },
            "relationships": {
              "author": {
                "data": {
                  "type": "people",
                  "id": "9"
                }
              }
            }
          }
        }

        beforeEach(() => {
          request = {
            url,
            headers: {
              'Accept': 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json'
            },
            method: 'POST',
            body: JSON.stringify(document)
          }

          response = {
            headers: {},
            status: 204,
            body: ''
          }
        })

        test('resolves result success without document', async () => {
          await expect(client.createResource(url, document)).resolves.toEqual({
            isSuccess: true,
            document: undefined,
            request,
            response
          })
        })
      })

      describe('when document does not include client generated ID', () => {
        beforeEach(() => {
          response = {
            headers: {},
            status: 204,
            body: ''
          }
        })

        test('resolves not successful result without document errors', async () => {
          await expect(client.createResource(url, document)).resolves.toEqual({
              isSuccess: false,
              document: undefined,
              request,
              response
            })
        })
      })
    })

    describe('when response other status', () => {
      describe('when media type is application/vnd.api+json', () => {
        describe('when body is document with errors', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 500,
              body: JSON.stringify(errorDocumentFixture)
            }
          })

          test('resolves not successful result with document errors', async () => {
            await expect(client.createResource(url, document)).resolves.toEqual({
              isSuccess: false,
              document: errorDocumentFixture,
              request,
              response
            })
          })
        })

        describe('when body is not document with errors', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 500,
              body: JSON.stringify(metaDocumentFixture)
            }
          })

          test('resolves not successful result without document', async () => {
            await expect(client.createResource(url, document)).resolves.toEqual({
              isSuccess: false,
              document: undefined,
              request,
              response
            })
          })
        })
      })

      describe('when media type is not application/vnd.api+json', () => {
        beforeEach(() => {
          response = {
            headers: {
              'Content-Type': 'text/html'
            },
            status: 500,
            body: '<!DOCTYPE html>'
          }
        })

        test('resolves not successful result without document', async () => {
          await expect(client.createResource(url, document)).resolves.toEqual({
            isSuccess: false,
            document: undefined,
            request,
            response
          })
        })
      })
    })
  })
})
