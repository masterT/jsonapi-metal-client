import * as TypeGuards from './DocumentMember.TypeGuards'

export { TypeGuards }

/**
 * JSON:API "meta object" that includes non-standard meta-information.
 * @example
 *     {
 *       "count": 10
 *     }
 * @example
 *     {
 *       "copyright": "Copyright 2015 Example Corp.",
 *       "authors": [
 *         "Yehuda Katz",
 *         "Steve Klabnik",
 *         "Dan Gebhardt",
 *         "Tyler Kellen"
 *       ]
 *     }
 * @see {@link https://jsonapi.org/format/#document-meta}
 * @see {@link isMetaObject} ts-auto-guard:type-guard
 */
export type MetaObject = { [key: string]: any }

/**
 * JSON:API "jsonapi object" that includes information about its implementation.
 * @example
 *     {
 *       "version": "1.0"
 *     }
 * @see {@link https://jsonapi.org/format/#document-jsonapi-object}
 * @see {@link isJsonApiObject} ts-auto-guard:type-guard
 */
export type JsonApiObject = {
  version?: string
  meta?: MetaObject
}

/**
 * JSON:API "resource identifier object" that identifies an individual resource.
 * @example
 *     {
 *       "type": "people",
 *       "id": "12"
 *     }
 * @see {@link https://jsonapi.org/format/#document-resource-identifier-objects}
 * @see {@link isResourceIdentifierObject} ts-auto-guard:type-guard
 */
export type ResourceIdentifierObject = {
  type: string
  id: string
  meta?: MetaObject
}

/**
 * JSON:API "link object" that represents a link.
 * @example
 *     {
 *       "href": "http://example.com/articles/1/comments",
 *       "meta": {
 *         "count": 10
 *       }
 *     }
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {@link isLinkObject} ts-auto-guard:type-guard
 */
export type LinkObject = {
  href?: string
  meta?: MetaObject
}

/**
 * JSON:API "link" that represents a link.
 * @example
 *     "http://example.com/articles/1"
 * @example
 *     {
 *       "href": "http://example.com/articles/1/comments",
 *       "meta": {
 *         "count": 10
 *       }
 *     }
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {@link isLink} ts-auto-guard:type-guard
 */
export type Link = string | LinkObject

/**
 * JSON:API "links object" that represents links.
 * @example
 *     {
 *       "self": "http://example.com/posts"
 *     }
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {@link isLinksObject} ts-auto-guard:type-guard
 */
export type LinksObject = {
  [key: string]: Link
}

/**
 * JSON:API "pagination links" that represents links to traverse a paginated data set.
 * @example
 *     {
 *        "self": "http://example.com/articles?page[number]=3&page[size]=1",
 *        "first": "http://example.com/articles?page[number]=1&page[size]=1",
 *        "prev": "http://example.com/articles?page[number]=2&page[size]=1",
 *        "next": "http://example.com/articles?page[number]=4&page[size]=1",
 *        "last": "http://example.com/articles?page[number]=13&page[size]=1"
 *      }
 * @see {@link https://jsonapi.org/format/#fetching-pagination}
 * @see {@link isPaginationLinks} ts-auto-guard:type-guard
 */
export type PaginationLinks = {
  first?: Link | null
  last?: Link | null
  prev?: Link | null
  next?: Link | null
}

/**
 * JSON:API "attributes object" that represents information about the resource object.
 * It MUST NOT contains a "relationships" or "links" member.
 * It SHOULD NOT contains has-one foreign keys (e.g. author_id).
 * @example
 *     {
 *       "title": "Rails is Omakase"
 *     }
 * @see {@link https://jsonapi.org/format/#document-resource-object-attributes}
 * @see {@link isAttributesObject} ts-auto-guard:type-guard
 */
export type AttributesObject = {
  [key: string]: any
}

/**
 * JSON:API "relationship object" member "links".
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipObjectLinks} ts-auto-guard:type-guard
 */
export type RelationshipObjectLinks = LinksObject & { self: Link } | LinksObject & { related: Link }

/**
 * JSON:API "relationship object" that represents a to-one relationship references from the resource object in which it’s defined to other resource object.
 * It MUST contain at least one of the following: links, data, or meta.
 * @example
 *     {
 *       "links": {
 *         "self": "/articles/1/relationships/author",
 *         "related": "/articles/1/author"
 *       },
 *       "data": { "type": "people", "id": "9" }
 *     }
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipToOneObject} ts-auto-guard:type-guard
 */
export type RelationshipToOneObject = {
  links: RelationshipObjectLinks
  data?: ResourceIdentifierObject | null
  meta?: MetaObject
} | {
  links?: RelationshipObjectLinks
  data: ResourceIdentifierObject | null
  meta?: MetaObject
} | {
  links?: RelationshipObjectLinks
  data?: ResourceIdentifierObject | null
  meta: MetaObject
}

/**
 * JSON:API "relationship object" that represents a to-many relationship references from the resource object in which it’s defined to other resource objects.
 * It MUST contain at least one of the following: links, data, or meta.
 * @example
 *     {
 *       "links": {
 *         "self": "http://example.com/articles/1/relationships/comments",
 *         "related": "http://example.com/articles/1/comments"
 *       },
 *       "data": [
 *         { "type": "comments", "id": "5" },
 *         { "type": "comments", "id": "12" }
 *       ]
 *     }
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipToManyObject} ts-auto-guard:type-guard
 */
export type RelationshipToManyObject = {
  links: RelationshipObjectLinks & PaginationLinks
  data?: ResourceIdentifierObject[]
  meta?: MetaObject
} | {
  links?: RelationshipObjectLinks & PaginationLinks
  data: ResourceIdentifierObject[]
  meta?: MetaObject
} | {
  links?: RelationshipObjectLinks & PaginationLinks
  data?: ResourceIdentifierObject[]
  meta: MetaObject
}

/**
 * JSON:API "relationship object" that represents references from the resource object in which it’s defined to other resource objects.
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipObject} ts-auto-guard:type-guard
 */
export type RelationshipObject = RelationshipToOneObject | RelationshipToManyObject

/**
 * JSON:API "relationships object".
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipsObject} ts-auto-guard:type-guard
 */
export type RelationshipsObject = {
  [key: string]: RelationshipObject
}

/**
 * JSON:API "resource object" that represents a resource.
 * @example
 *     {
 *       "type": "articles",
 *       "id": "1",
 *       "attributes": {
 *         "title": "Rails is Omakase"
 *       },
 *       "relationships": {
 *         "author": {
 *           "links": {
 *             "self": "/articles/1/relationships/author",
 *             "related": "/articles/1/author"
 *           },
 *           "data": { "type": "people", "id": "9" }
 *         }
 *       }
 *     }
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {@link isResourceObject} ts-auto-guard:type-guard
 */
export type ResourceObject = {
  id: string
  type: string
  attributes?: AttributesObject
  relationships?: RelationshipsObject
}

/**
 * JSON:API "error object" that provides additional information about problems encountered while performing an operation.
 * @example
 *     {
 *       "source": { "pointer": "/data/attributes/firstName" },
 *       "title": "Invalid Attribute",
 *       "detail": "First name must contain an emoji."
 *     }
 * @see {@link https://jsonapi.org/format/#error-objects}
 * @see {@link isErrorObject} ts-auto-guard:type-guard
 */
export type ErrorObject = {
  id?: any
  links?: {
    abount: Link
  }
  status?: string
  code?: string
  title?: string
  detail?: string
  source?: {
    pointer?: string
    parameter?: string
  }
  meta?: MetaObject
}
