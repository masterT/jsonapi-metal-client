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

  describe('deleteResource', () => {
    const url = 'http://example.com/articles/1'

    beforeEach(() => {
      request = {
        url,
        headers: {
          'Accept': 'application/vnd.api+json'
        },
        method: 'DELETE',
        body: null
      }

      response = {
        headers: {},
        status: 204,
        body: ''
      }
    })

    test('calls request on the httpAdapter', () => {
      client.deleteResource(url)

      expect(requestFunction.mock.calls.length).toBe(1)
      expect(requestFunction.mock.calls[0]).toEqual([request])
    })

    describe('when status 200', () => {
      describe('when media type is application/vnd.api+json', () => {
        describe('when body is a meta document', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify(metaDocumentFixture)
            }
          })

          test('resolves result success with document', async () => {
            await expect(client.deleteResource(url)).resolves.toEqual({
              isSuccess: true,
              document: metaDocumentFixture,
              request,
              response
            })
          })
        })

        describe('when body is not a meta document', () => {
          beforeEach(() => {
            response = {
              headers: {
                'Content-Type': 'application/vnd.api+json'
              },
              status: 200,
              body: JSON.stringify({})
            }
          })

          test('resolves not successful result without document', async () => {
            await expect(client.deleteResource(url)).resolves.toEqual({
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
          await expect(client.deleteResource(url)).resolves.toEqual({
            isSuccess: false,
            document: null,
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
        await expect(client.deleteResource(url)).resolves.toEqual({
          isSuccess: true,
          document: null,
          request,
          response
        })
      })
    })

    describe('when status 204', () => {
      beforeEach(() => {
        response = {
          headers: {},
          status: 204,
          body: ''
        }
      })

      test('resolves result success without document', async () => {
        await expect(client.deleteResource(url)).resolves.toEqual({
          isSuccess: true,
          document: null,
          request,
          response
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
            await expect(client.deleteResource(url)).resolves.toEqual({
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
            await expect(client.deleteResource(url)).resolves.toEqual({
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
          await expect(client.deleteResource(url)).resolves.toEqual({
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
