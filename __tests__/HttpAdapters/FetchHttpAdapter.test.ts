import { Response } from 'cross-fetch';
import { HttpAdapters, HttpAdapter } from '../../src';

describe.only('HttpAdapters.FetchHttpAdapter', () => {
  let fetchFunction: any;
  let request: HttpAdapter.AdapterRequest;
  let response: Response;
  let httpAdapter: HttpAdapters.FetchHttpAdapter;

  beforeEach(() => {
    request = {
      url: 'https://examples.com/',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': 'db4de92f933092b1f1f6665a742b7192a5eced77'
      },
      method: 'POST',
      body: '{"foo":"bar"}'
    };
    response = new Response('<!DOCTYPE html>', {
      status: 200,
      statusText: 'ok',
      headers: {
        'Content-Type': 'text/html'
      }
    });
    fetchFunction = jest.fn().mockImplementation(() => response);
    httpAdapter = new HttpAdapters.FetchHttpAdapter(fetchFunction);
  });

  describe('request', () => {
    test('calls fetch function', () => {
      httpAdapter.request(request);

      expect(fetchFunction.mock.calls.length).toBe(1);
      expect(fetchFunction.mock.calls[0]).toEqual([
        'https://examples.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': 'db4de92f933092b1f1f6665a742b7192a5eced77'
          },
          body: '{"foo":"bar"}'
        }
      ]);
    });

    test('resolves with response', async () => {
      await expect(httpAdapter.request(request)).resolves.toEqual({
        body: '<!DOCTYPE html>',
        headers: {
          'content-type': 'text/html'
        },
        status: 200
      });
    });
  });
});
