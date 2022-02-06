/*
 * Generated type guards for "Document.ts".
 * WARNING: Do not manually change this file.
 */
import { Document, DataDocument, MetaDocument, ErrorDocument, FetchResponse, FetchResourceResponse, FetchResourceIndividualResponse, FetchResourceCollectionResponse, FetchRelationshipResponse, FetchRelationshipToOneResponse, FetchRelationshipToManyResponse, CreateResourceDocument, UpdateResourceDocument, UpdateRelationshipDocument, UpdateRelationshipResponse, UpdateRelationshipToOneDocument, UpdateRelationshipToOneResponse, UpdateRelationshipToManyDocument, UpdateRelationshipToManyResponse } from "./Document";
import { isResourceIdentifierObject, isResourceObject, isMetaObject, isJsonApiObject, isLinksObject, isErrorObject, isAttributesObject, isRelationshipsObject } from "./DocumentMember.TypeGuards";

export function isDocument(obj: any, _argumentName?: string): obj is Document {
    return (
        (isDataDocument(obj) as boolean ||
            isMetaDocument(obj) as boolean ||
            isErrorDocument(obj) as boolean)
    )
}

export function isDataDocument(obj: any, _argumentName?: string): obj is DataDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj.data === null ||
            isResourceIdentifierObject(obj.data) as boolean ||
            isResourceObject(obj.data) as boolean ||
            Array.isArray(obj.data) &&
            obj.data.every((e: any) =>
                isResourceObject(e) as boolean
            ) ||
            Array.isArray(obj.data) &&
            obj.data.every((e: any) =>
                isResourceIdentifierObject(e) as boolean
            )) &&
        (typeof obj.included === "undefined" ||
            Array.isArray(obj.included) &&
            obj.included.every((e: any) =>
                isResourceObject(e) as boolean
            )) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean) &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isMetaDocument(obj: any, _argumentName?: string): obj is MetaDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        isMetaObject(obj.meta) as boolean &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isErrorDocument(obj: any, _argumentName?: string): obj is ErrorDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.errors) &&
        obj.errors.every((e: any) =>
            isErrorObject(e) as boolean
        ) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean) &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isFetchResponse(obj: any, _argumentName?: string): obj is FetchResponse {
    return (
        (isFetchResourceIndividualResponse(obj) as boolean ||
            isFetchResourceCollectionResponse(obj) as boolean ||
            isFetchRelationshipToOneResponse(obj) as boolean ||
            isFetchRelationshipToManyResponse(obj) as boolean)
    )
}

export function isFetchResourceResponse(obj: any, _argumentName?: string): obj is FetchResourceResponse {
    return (
        (isFetchResourceIndividualResponse(obj) as boolean ||
            isFetchResourceCollectionResponse(obj) as boolean)
    )
}

export function isFetchResourceIndividualResponse(obj: any, _argumentName?: string): obj is FetchResourceIndividualResponse {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj.data === null ||
            isResourceObject(obj.data) as boolean) &&
        (typeof obj.included === "undefined" ||
            Array.isArray(obj.included) &&
            obj.included.every((e: any) =>
                isResourceObject(e) as boolean
            )) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean) &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isFetchResourceCollectionResponse(obj: any, _argumentName?: string): obj is FetchResourceCollectionResponse {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.data) &&
        obj.data.every((e: any) =>
            isResourceObject(e) as boolean
        ) &&
        (typeof obj.included === "undefined" ||
            Array.isArray(obj.included) &&
            obj.included.every((e: any) =>
                isResourceObject(e) as boolean
            )) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean) &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isFetchRelationshipResponse(obj: any, _argumentName?: string): obj is FetchRelationshipResponse {
    return (
        (isFetchRelationshipToOneResponse(obj) as boolean ||
            isFetchRelationshipToManyResponse(obj) as boolean)
    )
}

export function isFetchRelationshipToOneResponse(obj: any, _argumentName?: string): obj is FetchRelationshipToOneResponse {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj.data === null ||
            isResourceIdentifierObject(obj.data) as boolean) &&
        (typeof obj.included === "undefined" ||
            Array.isArray(obj.included) &&
            obj.included.every((e: any) =>
                isResourceObject(e) as boolean
            )) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean) &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isFetchRelationshipToManyResponse(obj: any, _argumentName?: string): obj is FetchRelationshipToManyResponse {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.data) &&
        obj.data.every((e: any) =>
            isResourceIdentifierObject(e) as boolean
        ) &&
        (typeof obj.included === "undefined" ||
            Array.isArray(obj.included) &&
            obj.included.every((e: any) =>
                isResourceObject(e) as boolean
            )) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean) &&
        (typeof obj.jsonapi === "undefined" ||
            isJsonApiObject(obj.jsonapi) as boolean) &&
        (typeof obj.links === "undefined" ||
            isLinksObject(obj.links) as boolean)
    )
}

export function isCreateResourceDocument(obj: any, _argumentName?: string): obj is CreateResourceDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj.data !== null &&
            typeof obj.data === "object" ||
            typeof obj.data === "function") &&
        (typeof obj.data.id === "undefined" ||
            typeof obj.data.id === "string") &&
        typeof obj.data.type === "string" &&
        (typeof obj.data.attributes === "undefined" ||
            isAttributesObject(obj.data.attributes) as boolean) &&
        (typeof obj.data.relationships === "undefined" ||
            isRelationshipsObject(obj.data.relationships) as boolean) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isUpdateResourceDocument(obj: any, _argumentName?: string): obj is UpdateResourceDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        isResourceObject(obj.data) as boolean &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isUpdateRelationshipDocument(obj: any, _argumentName?: string): obj is UpdateRelationshipDocument {
    return (
        (isUpdateRelationshipToOneDocument(obj) as boolean ||
            isUpdateRelationshipToManyDocument(obj) as boolean)
    )
}

export function isUpdateRelationshipResponse(obj: any, _argumentName?: string): obj is UpdateRelationshipResponse {
    return (
        (obj === null ||
            isMetaDocument(obj) as boolean ||
            isFetchRelationshipToOneResponse(obj) as boolean ||
            isFetchRelationshipToManyResponse(obj) as boolean)
    )
}

export function isUpdateRelationshipToOneDocument(obj: any, _argumentName?: string): obj is UpdateRelationshipToOneDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (obj.data === null ||
            isResourceIdentifierObject(obj.data) as boolean) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isUpdateRelationshipToOneResponse(obj: any, _argumentName?: string): obj is UpdateRelationshipToOneResponse {
    return (
        (obj === null ||
            isMetaDocument(obj) as boolean ||
            isFetchRelationshipToOneResponse(obj) as boolean)
    )
}

export function isUpdateRelationshipToManyDocument(obj: any, _argumentName?: string): obj is UpdateRelationshipToManyDocument {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.data) &&
        obj.data.every((e: any) =>
            isResourceIdentifierObject(e) as boolean
        ) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isUpdateRelationshipToManyResponse(obj: any, _argumentName?: string): obj is UpdateRelationshipToManyResponse {
    return (
        (obj === null ||
            isMetaDocument(obj) as boolean ||
            isFetchRelationshipToManyResponse(obj) as boolean)
    )
}
