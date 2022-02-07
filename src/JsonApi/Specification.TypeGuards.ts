/*
 * Generated type guards for "Specification.ts".
 * WARNING: Do not manually change this file.
 */
import { MetaObject, JsonApiObject, ResourceIdentifierObject, LinkObject, Link, LinksObject, PaginationLinks, AttributesObject, RelationshipObjectLinks, RelationshipToOneObject, RelationshipToManyObject, RelationshipObject, RelationshipsObject, ResourceObject, ErrorObject, Document, DataDocument, MetaDocument, ErrorDocument, FetchResponse, FetchResourceResponse, FetchResourceIndividualResponse, FetchResourceCollectionResponse, FetchRelationshipResponse, FetchRelationshipToOneResponse, FetchRelationshipToManyResponse, CreateResourceDocument, UpdateResourceDocument, UpdateRelationshipDocument, UpdateRelationshipResponse, UpdateRelationshipToOneDocument, UpdateRelationshipToOneResponse, UpdateRelationshipToManyDocument, UpdateRelationshipToManyResponse } from "./Specification";

export function isMetaObject(obj: any, _argumentName?: string): obj is MetaObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isJsonApiObject(obj: any, _argumentName?: string): obj is JsonApiObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.version === "undefined" ||
            typeof obj.version === "string") &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isResourceIdentifierObject(obj: any, _argumentName?: string): obj is ResourceIdentifierObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.type === "string" &&
        typeof obj.id === "string" &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isLinkObject(obj: any, _argumentName?: string): obj is LinkObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.href === "undefined" ||
            typeof obj.href === "string") &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

export function isLink(obj: any, _argumentName?: string): obj is Link {
    return (
        (typeof obj === "string" ||
            isLinkObject(obj) as boolean)
    )
}

export function isLinksObject(obj: any, _argumentName?: string): obj is LinksObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isPaginationLinks(obj: any, _argumentName?: string): obj is PaginationLinks {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.first === "undefined" ||
            obj.first === null ||
            typeof obj.first === "string" ||
            isLinkObject(obj.first) as boolean) &&
        (typeof obj.last === "undefined" ||
            obj.last === null ||
            typeof obj.last === "string" ||
            isLinkObject(obj.last) as boolean) &&
        (typeof obj.prev === "undefined" ||
            obj.prev === null ||
            typeof obj.prev === "string" ||
            isLinkObject(obj.prev) as boolean) &&
        (typeof obj.next === "undefined" ||
            obj.next === null ||
            typeof obj.next === "string" ||
            isLinkObject(obj.next) as boolean)
    )
}

export function isAttributesObject(obj: any, _argumentName?: string): obj is AttributesObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isRelationshipObjectLinks(obj: any, _argumentName?: string): obj is RelationshipObjectLinks {
    return (
        (isLinksObject(obj) as boolean &&
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            isLink(obj.self) as boolean ||
            isLinksObject(obj) as boolean &&
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            isLink(obj.related) as boolean)
    )
}

export function isRelationshipToOneObject(obj: any, _argumentName?: string): obj is RelationshipToOneObject {
    return (
        ((obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isRelationshipObjectLinks(obj.links) as boolean &&
            (typeof obj.data === "undefined" ||
                obj.data === null ||
                isResourceIdentifierObject(obj.data) as boolean) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean) &&
            (obj.data === null ||
                isResourceIdentifierObject(obj.data) as boolean) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean) &&
            (typeof obj.data === "undefined" ||
                obj.data === null ||
                isResourceIdentifierObject(obj.data) as boolean) &&
            isMetaObject(obj.meta) as boolean)
    )
}

export function isRelationshipToManyObject(obj: any, _argumentName?: string): obj is RelationshipToManyObject {
    return (
        ((obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            (isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean &&
                isPaginationLinks(obj.links) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean &&
                isPaginationLinks(obj.links) as boolean) &&
            (typeof obj.data === "undefined" ||
                Array.isArray(obj.data) &&
                obj.data.every((e: any) =>
                    isResourceIdentifierObject(e) as boolean
                )) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean &&
                isPaginationLinks(obj.links) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean &&
                isPaginationLinks(obj.links) as boolean) &&
            Array.isArray(obj.data) &&
            obj.data.every((e: any) =>
                isResourceIdentifierObject(e) as boolean
            ) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean &&
                isPaginationLinks(obj.links) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean &&
                isPaginationLinks(obj.links) as boolean) &&
            (typeof obj.data === "undefined" ||
                Array.isArray(obj.data) &&
                obj.data.every((e: any) =>
                    isResourceIdentifierObject(e) as boolean
                )) &&
            isMetaObject(obj.meta) as boolean)
    )
}

export function isRelationshipObject(obj: any, _argumentName?: string): obj is RelationshipObject {
    return (
        ((obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
            isRelationshipObjectLinks(obj.links) as boolean &&
            (typeof obj.data === "undefined" ||
                obj.data === null ||
                isResourceIdentifierObject(obj.data) as boolean) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean) &&
            (obj.data === null ||
                isResourceIdentifierObject(obj.data) as boolean) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean) &&
            (typeof obj.data === "undefined" ||
                obj.data === null ||
                isResourceIdentifierObject(obj.data) as boolean) &&
            isMetaObject(obj.meta) as boolean ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean &&
                isPaginationLinks(obj.links) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean &&
                isPaginationLinks(obj.links) as boolean) &&
            (typeof obj.data === "undefined" ||
                Array.isArray(obj.data) &&
                obj.data.every((e: any) =>
                    isResourceIdentifierObject(e) as boolean
                )) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean &&
                isPaginationLinks(obj.links) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean &&
                isPaginationLinks(obj.links) as boolean) &&
            Array.isArray(obj.data) &&
            obj.data.every((e: any) =>
                isResourceIdentifierObject(e) as boolean
            ) &&
            (typeof obj.meta === "undefined" ||
                isMetaObject(obj.meta) as boolean) ||
            (obj !== null &&
                typeof obj === "object" ||
                typeof obj === "function") &&
            (typeof obj.links === "undefined" ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.self) as boolean &&
                isPaginationLinks(obj.links) as boolean ||
                isLinksObject(obj.links) as boolean &&
                (obj.links !== null &&
                    typeof obj.links === "object" ||
                    typeof obj.links === "function") &&
                isLink(obj.links.related) as boolean &&
                isPaginationLinks(obj.links) as boolean) &&
            (typeof obj.data === "undefined" ||
                Array.isArray(obj.data) &&
                obj.data.every((e: any) =>
                    isResourceIdentifierObject(e) as boolean
                )) &&
            isMetaObject(obj.meta) as boolean)
    )
}

export function isRelationshipsObject(obj: any, _argumentName?: string): obj is RelationshipsObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function")
    )
}

export function isResourceObject(obj: any, _argumentName?: string): obj is ResourceObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.id === "string" &&
        typeof obj.type === "string" &&
        (typeof obj.attributes === "undefined" ||
            isAttributesObject(obj.attributes) as boolean) &&
        (typeof obj.relationships === "undefined" ||
            isRelationshipsObject(obj.relationships) as boolean)
    )
}

export function isErrorObject(obj: any, _argumentName?: string): obj is ErrorObject {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        (typeof obj.links === "undefined" ||
            (obj.links !== null &&
                typeof obj.links === "object" ||
                typeof obj.links === "function") &&
            isLink(obj.links.abount) as boolean) &&
        (typeof obj.status === "undefined" ||
            typeof obj.status === "string") &&
        (typeof obj.code === "undefined" ||
            typeof obj.code === "string") &&
        (typeof obj.title === "undefined" ||
            typeof obj.title === "string") &&
        (typeof obj.detail === "undefined" ||
            typeof obj.detail === "string") &&
        (typeof obj.source === "undefined" ||
            (obj.source !== null &&
                typeof obj.source === "object" ||
                typeof obj.source === "function") &&
            (typeof obj.source.pointer === "undefined" ||
                typeof obj.source.pointer === "string") &&
            (typeof obj.source.parameter === "undefined" ||
                typeof obj.source.parameter === "string")) &&
        (typeof obj.meta === "undefined" ||
            isMetaObject(obj.meta) as boolean)
    )
}

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
                isResourceIdentifierObject(e) as boolean
            ) ||
            Array.isArray(obj.data) &&
            obj.data.every((e: any) =>
                isResourceObject(e) as boolean
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
            isLinksObject(obj.links) as boolean &&
            isPaginationLinks(obj.links) as boolean)
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
            isLinksObject(obj.links) as boolean &&
            isPaginationLinks(obj.links) as boolean)
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
