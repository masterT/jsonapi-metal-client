import * as TypeGuards from "./HttpAdapter.TypeGuards"

/** @see {@link isResponse} ts-auto-guard:type-guard */
export interface Response {
  status: number,
  headers: { [key: string]: string }
  body?: string
}

/** @see {@link isRequest} ts-auto-guard:type-guard */
export interface Request {
  url: string
  method: string
  headers?: { [key: string]: string }
  body: string | null
}

/** @see {@link isAdapter} ts-auto-guard:type-guard */
export interface Adapter {
  request(options: Request): Promise<Response>
}

export { TypeGuards }
