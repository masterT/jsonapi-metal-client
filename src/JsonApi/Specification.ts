import * as TypeGuards from "./Specification.TypeGuards"

export { TypeGuards }

/**
 * JSON:API "meta object" that includes non-standard meta-information.
 * @see {@link https://jsonapi.org/format/#document-meta}
 * @see {isMetaObject} ts-auto-guard:type-guard
 */
export type MetaObject = { [key: string]: any }

/**
 * JSON:API "jsonapi object" that includes information about its implementation.
 * @see {@link https://jsonapi.org/format/#document-jsonapi-object}
 * @see {isJsonApiObject} ts-auto-guard:type-guard
 */
export type JsonApiObject = {
  version?: string
  meta?: MetaObject
}

/**
 * JSON:API "resource identifier object" that identifies an individual resource.
 * @see {@link https://jsonapi.org/format/#document-resource-identifier-objects}
 * @see {isResourceIdentifierObject} ts-auto-guard:type-guard
 */
export type ResourceIdentifierObject = {
  type: string
  id: string
  meta?: MetaObject
}

/**
 * JSON:API "link object" that represents a link.
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {isLinkObject} ts-auto-guard:type-guard
 */
export type LinkObject = {
  href?: string
  meta?: MetaObject
}

/**
 * JSON:API "link" that represents a link.
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {isLink} ts-auto-guard:type-guard
 */
export type Link = string | LinkObject

/**
 * JSON:API "links object" that represents links.
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {isLinksObject} ts-auto-guard:type-guard
 */
export type LinksObject = {
  [key: string]: Link
}

/**
 * JSON:API "pagination links" that represents links to traverse a paginated data set.
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {isPaginationLinks} ts-auto-guard:type-guard
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
 * @see {@link https://jsonapi.org/format/#document-resource-object-attributes}
 * @see {isAttributesObject} ts-auto-guard:type-guard
 */
export type AttributesObject = {
  [key: string]: any
}

/**
 * JSON:API "relationship object" member "links".
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {isRelationshipObjectLinks} ts-auto-guard:type-guard
 */
export type RelationshipObjectLinks = LinksObject & { self: Link } | LinksObject & { related: Link }

/**
 * JSON:API "relationship object" that represents a to-one relationship references from the resource object in which it’s defined to other resource object.
 * It MUST contain at least one of the following: links, data, or meta.
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {isRelationshipToOneObject} ts-auto-guard:type-guard
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
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {isRelationshipToManyObject} ts-auto-guard:type-guard
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
 * @see {isRelationshipObject} ts-auto-guard:type-guard
 */
export type RelationshipObject = RelationshipToOneObject | RelationshipToManyObject

/**
 * JSON:API "relationships object".
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {isRelationshipsObject} ts-auto-guard:type-guard
 */
export type RelationshipsObject = {
  [key: string]: RelationshipObject
}

/**
 * JSON:API "resource object" that represents a resource.
 * @see {@link https://jsonapi.org/format/#document-links}
 * @see {isResourceObject} ts-auto-guard:type-guard
 */
export type ResourceObject = {
  id: string
  type: string
  attributes?: AttributesObject
  relationships?: RelationshipsObject
}

/**
 * JSON:API "error object" that provides additional information about problems encountered while performing an operation.
 * @see {@link https://jsonapi.org/format/#error-objects}
 * @see {isErrorObject} ts-auto-guard:type-guard
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

// -------------------- Document --------------------

/**
 * JSON:API "top level".
 * The members data and errors MUST NOT coexist in the same document.
 * It MUST contain at least one of the following: data, errors, or meta.
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {isDocument} ts-auto-guard:type-guard
 */
export type Document = DataDocument | MetaDocument | ErrorDocument

/**
 * JSON:API "top level" with "primary data".
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {isDataDocument} ts-auto-guard:type-guard
 */
export type DataDocument = {
  data: ResourceObject | ResourceIdentifierObject | null | ResourceObject[] | ResourceIdentifierObject[]
  included?: ResourceObject[]
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}

/**
 * JSON:API "top level" with "meta object".
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {isMetaDocument} ts-auto-guard:type-guard
 */
export type MetaDocument = {
  meta: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}

/**
 * JSON:API "top level" with array of "error object".
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {isErrorDocument} ts-auto-guard:type-guard
 */
export type ErrorDocument = {
  errors: ErrorObject[]
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}


// -------------------- Fetching data document --------------------

/**
 * JSON:API response document for fetching data.
 * @see {@link https://jsonapi.org/format/#fetching}
 * @see {isFetchResponse} ts-auto-guard:type-guard
 */
export type FetchResponse = FetchResourceResponse | FetchRelationshipResponse


// -------------------- Fetching resources document --------------------

/**
 * JSON:API response document for fetching individual resource or collection of resources.
 * @see {@link https://jsonapi.org/format/#fetching-resources-responses}
 * @see {isFetchResourceResponse} ts-auto-guard:type-guard
 */
export type FetchResourceResponse = FetchResourceIndividualResponse | FetchResourceCollectionResponse

/**
 * JSON:API response document for fetching individual resource.
 * @see {@link https://jsonapi.org/format/#fetching-resources-responses}
 * @see {isFetchResourceIndividualResponse} ts-auto-guard:type-guard
 */
export type FetchResourceIndividualResponse = {
  data: ResourceObject | null
  included?: ResourceObject[]
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}

/**
 * JSON:API response document for fetching collection of resources.
 * @see {@link https://jsonapi.org/format/#fetching-resources-responses}
 * @see {isFetchResourceCollectionResponse} ts-auto-guard:type-guard
 */
export type FetchResourceCollectionResponse = {
  data: ResourceObject[]
  included?: ResourceObject[]
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}


// -------------------- Fetching relationships document --------------------

/**
 * JSON:API response document for fetching to-one or to-many relationship.
 * @see {@link https://jsonapi.org/format/#fetching-relationships}
 * @see {isFetchRelationshipResponse} ts-auto-guard:type-guard
 */
export type FetchRelationshipResponse = FetchRelationshipToOneResponse | FetchRelationshipToManyResponse

/**
 * JSON:API response document for fetching to-one relationship.
 * @see {@link https://jsonapi.org/format/#fetching-relationships}
 * @see {isFetchRelationshipToOneResponse} ts-auto-guard:type-guard
 */
export type FetchRelationshipToOneResponse = {
  data: ResourceIdentifierObject | null
  included?: ResourceObject[]
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}

/**
 * JSON:API response document for fetching to-many relationship.
 * @see {@link https://jsonapi.org/format/#fetching-relationships}
 * @see {isFetchRelationshipToManyResponse} ts-auto-guard:type-guard
 */
export type FetchRelationshipToManyResponse = {
  data: ResourceIdentifierObject[]
  included?: ResourceObject[]
  meta?: MetaObject
  jsonapi?: JsonApiObject
  links?: LinksObject
}


// -------------------- Creating resource --------------------

/**
 * JSON:API request document for creating resource.
 * @see {@link https://jsonapi.org/format/#crud-creating}
 * @see {isCreateResourceDocument} ts-auto-guard:type-guard
 */
export type CreateResourceDocument = {
  data: {
    id?: string
    type: string
    attributes?: AttributesObject
    relationships?: RelationshipsObject
  }
  meta?: MetaObject
}


// -------------------- Updating resource --------------------

/**
 * JSON:API request document for updating resource.
 * @see {@link https://jsonapi.org/format/#crud-updating}
 * @see {isUpdateResourceDocument} ts-auto-guard:type-guard
 */
export type UpdateResourceDocument = {
  data: ResourceObject
  meta?: MetaObject
}


// -------------------- Updating relationship --------------------

/**
 * JSON:API request document for updating to-one or to-many relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-relationships}
 * @see {isUpdateRelationshipDocument} ts-auto-guard:type-guard
 */
export type UpdateRelationshipDocument = UpdateRelationshipToOneDocument | UpdateRelationshipToManyDocument

/**
 * JSON:API request document for updating to-one relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-to-one-relationships}
 * @see {isUpdateRelationshipToOneDocument} ts-auto-guard:type-guard
 */
export type UpdateRelationshipToOneDocument = {
  data: ResourceIdentifierObject | null
  meta?: MetaObject
}

/**
 * JSON:API request document for updating to-many relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-to-many-relationships}
 * @see {isUpdateRelationshipToManyDocument} ts-auto-guard:type-guard
 */
export type UpdateRelationshipToManyDocument = {
  data: ResourceIdentifierObject[]
  meta?: MetaObject
}
