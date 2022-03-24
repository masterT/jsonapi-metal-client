import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HttpAdapters, HttpAdapter } from '../../src';

describe.only('HttpAdapters.AxiosHttpAdapter', () => {
  let axiosInstance: AxiosInstance;
  let axiosMock: MockAdapter;
  let request: HttpAdapter.AdapterRequest;
  let httpAdapter: HttpAdapters.AxiosHttpAdapter;

  beforeAll(() => {
    axiosInstance = axios.create();
    axiosMock = new MockAdapter(axiosInstance);
    httpAdapter = new HttpAdapters.AxiosHttpAdapter(axiosInstance);
  });

  beforeEach(() => {
    request = {
      url: 'https://examples.com/',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: '{"foo":"bar"}'
    };
  });

  afterEach(() => {
    axiosMock.reset();
  });

  describe('request', () => {
    beforeEach(() => {
      axiosMock
        .onPost('https://examples.com/')
        .reply(200, '{"message":"ok"}', { 'Content-Type': 'application/json' });
    });

    test('calls request on the axios instance', async () => {
      await httpAdapter.request(request);

      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0]).toMatchObject({
        url: 'https://examples.com/',
        method: expect.stringMatching(/post/i),
        headers: {
          'Content-Type': 'application/json'
        },
        data: '{"foo":"bar"}',
        transitional: {
          silentJSONParsing: false,
          forcedJSONParsing: false
        }
      });
    });

    test('resolves with response', async () => {
      await expect(httpAdapter.request(request)).resolves.toEqual({
        body: '{"message":"ok"}',
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200
      });
    });
  });
});
