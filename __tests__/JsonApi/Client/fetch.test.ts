import * as dataDocumentResourceIndividualFixture from '../../fixtures/data-document/resource-individual.json'
import * as dataDocumentResourceCollectionFixture from '../../fixtures/data-document/resource-collection.json'
import * as dataDocumentRelationshipToOneFixture from '../../fixtures/data-document/relationship-to-one.json'
import * as dataDocumentRelationshipToManyFixture from '../../fixtures/data-document/relationship-to-many.json'
import * as errorDocumentFixture from '../../fixtures/error-document.json'
import * as metaDocumentFixture from '../../fixtures/meta-document.json'
import { HttpAdapter, JsonApi } from '../../../src'

class HttpAdapterMock implements HttpAdapter.Adapter {
  request(options: HttpAdapter.AdapterRequest): Promise<HttpAdapter.AdapterResponse> {
    throw new Error('Method not implemented.');
  }
}

describe('JsonApi.Client', () => {
  let httpAdapter: HttpAdapter.Adapter
  let client: JsonApi.Client
  let requestFunction: any
  let response: HttpAdapter.AdapterResponse
  let request: HttpAdapter.AdapterRequest

  beforeEach(() => {
    httpAdapter = new HttpAdapterMock()
    requestFunction = jest.fn().mockImplementation(() => response)
    httpAdapter.request = requestFunction.bind(httpAdapter)
    client = new JsonApi.Client(httpAdapter)
  })

  describe('fetch', () => {
    const url = 'http://example.com/individual-or-collection-resource-or-relationship-to-one-or-to-many-relationship'

    beforeEach(() => {
      request = {
        url,
        headers: {
          'Accept': 'application/vnd.api+json'
        },
        method: 'GET',
        body: null
      }

      response = {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        status: 200,
        body: JSON.stringify(dataDocumentResourceIndividualFixture)
      }
    })

    test('calls request on the httpAdapter', () => {
      client.fetch(url)

      expect(requestFunction.mock.calls.length).toBe(1)
      expect(requestFunction.mock.calls[0]).toEqual([request])
    })

    describe('with defaultHttpHeaders', () => {
      beforeEach(() => {
        client.defaultHttpHeaders = {
          'x-foo': 'bar'
        }
      })

      test('calls request on the httpAdapter with defaultHttpHeaders', () => {
        client.fetch(url)

        expect(requestFunction.mock.calls.length).toBe(1)
        expect(requestFunction.mock.calls[0]).toEqual([
          {
            url,
            headers: {
              'Accept': 'application/vnd.api+json',
              'x-foo': 'bar'
            },
            method: 'GET',
            body: null
          }
        ])
      })
    })

    describe('when status 200', () => {
      describe('when media type is application/vnd.api+json', () => {
        describe('when body is document with individual resource', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify(dataDocumentResourceIndividualFixture)
            }
          })

          test('resolves result success with document', async () => {
            await expect(client.fetch(url)).resolves.toEqual({
              isSuccess: true,
              document: dataDocumentResourceIndividualFixture,
              request,
              response
            })
          })
        })

        describe('when body is document with resource collection', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify(dataDocumentResourceCollectionFixture)
            }
          })

          test('resolves result success with document', async () => {
            await expect(client.fetch(url)).resolves.toEqual({
              isSuccess: true,
              document: dataDocumentResourceCollectionFixture,
              request,
              response
            })
          })
        })

        describe('when body is document with relationship to-one', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify(dataDocumentRelationshipToOneFixture)
            }
          })

          test('resolves result success with document', async () => {
            await expect(client.fetch(url)).resolves.toEqual({
              isSuccess: true,
              document: dataDocumentRelationshipToOneFixture,
              request,
              response
            })
          })
        })

        describe('when body is document with relationship to-many', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify(dataDocumentRelationshipToManyFixture)
            }
          })

          test('resolves result success with document', async () => {
            await expect(client.fetch(url)).resolves.toEqual({
              isSuccess: true,
              document: dataDocumentRelationshipToManyFixture,
              request,
              response
            })
          })
        })

        describe('when body is not an resource or relationship document', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify(metaDocumentFixture)
            }
          })

          test('resolves not successful result without document', async () => {
            await expect(client.fetch(url)).resolves.toEqual({
              isSuccess: false,
              document: null,
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
            status: 200,
            body: '<!DOCTYPE html>'
          }
        })

        test('resolves not successful result without document', async () => {
          await expect(client.fetch(url)).resolves.toEqual({
            isSuccess: false,
            document: null,
            request,
            response
          })
        })
      })
    })

    describe('when response status not 200', () => {
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
            await expect(client.fetch(url)).resolves.toEqual({
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
            await expect(client.fetch(url)).resolves.toEqual({
              isSuccess: false,
              document: null,
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
          await expect(client.fetch(url)).resolves.toEqual({
            isSuccess: false,
            document: null,
            request,
            response
          })
        })
      })
    })
  })
})
