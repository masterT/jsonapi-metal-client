/*
 * Generated type guards for "HttpAdapter.ts".
 * WARNING: Do not manually change this file.
 */
import { Response, Request, Adapter } from "./HttpAdapter";

export function isResponse(obj: any, _argumentName?: string): obj is Response {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.status === "number" &&
        (obj.headers !== null &&
            typeof obj.headers === "object" ||
            typeof obj.headers === "function") &&
        (typeof obj.body === "undefined" ||
            typeof obj.body === "string")
    )
}

export function isRequest(obj: any, _argumentName?: string): obj is Request {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.url === "string" &&
        typeof obj.method === "string" &&
        (typeof obj.headers === "undefined" ||
            (obj.headers !== null &&
                typeof obj.headers === "object" ||
                typeof obj.headers === "function")) &&
        (obj.body === null ||
            typeof obj.body === "string")
    )
}

export function isAdapter(obj: any, _argumentName?: string): obj is Adapter {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.request === "function"
    )
}
