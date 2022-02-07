import * as TypeGuards from './HttpAdapter.TypeGuards';

/** @see {@link isAdapterResponse} ts-auto-guard:type-guard */
export interface AdapterResponse {
  status: number;
  headers: { [key: string]: string };
  body?: string;
}

/** @see {@link isAdapterRequest} ts-auto-guard:type-guard */
export interface AdapterRequest {
  url: string;
  method: string;
  headers?: { [key: string]: string };
  body: string | null;
}

/** @see {@link isAdapter} ts-auto-guard:type-guard */
export interface Adapter {
  /**
   * Make an HTTP request.
   * @param options
   * @returns
   */
  request(options: AdapterRequest): Promise<AdapterResponse>;
}

export { TypeGuards };
