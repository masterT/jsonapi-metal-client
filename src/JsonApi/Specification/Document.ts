import * as TypeGuards from './Document.TypeGuards';
import {
  AttributesObject,
  ErrorObject,
  JsonApiObject,
  LinksObject,
  MetaObject,
  PaginationLinks,
  RelationshipsObject,
  ResourceIdentifierObject,
  ResourceObject
} from './DocumentMember';

export { TypeGuards };

/**
 * JSON:API "top level".
 * The members data and errors MUST NOT coexist in the same document.
 * It MUST contain at least one of the following: data, errors, or meta.
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {@link isDocument} ts-auto-guard:type-guard
 */
export type Document = DataDocument | MetaDocument | ErrorDocument;

/**
 * JSON:API "top level" with "primary data".
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {@link isDataDocument} ts-auto-guard:type-guard
 */
export type DataDocument = {
  data:
    | ResourceObject
    | ResourceIdentifierObject
    | null
    | ResourceObject[]
    | ResourceIdentifierObject[];
  included?: ResourceObject[];
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject;
};

/**
 * JSON:API "top level" with "meta object".
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {@link isMetaDocument} ts-auto-guard:type-guard
 */
export type MetaDocument = {
  meta: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject;
};

/**
 * JSON:API "top level" with array of "error object".
 * @example
 *     {
 *       "errors": [
 *         {
 *           "status": "422",
 *           "source": { "pointer": "/data/attributes/firstName" },
 *           "title":  "Invalid Attribute",
 *           "detail": "First name must contain at least three characters."
 *         }
 *       ]
 *     }
 * @see {@link https://jsonapi.org/format/#document-top-level}
 * @see {@link isErrorDocument} ts-auto-guard:type-guard
 */
export type ErrorDocument = {
  errors: ErrorObject[];
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject;
};

// -------------------- Fetching data document --------------------

/**
 * JSON:API response document for fetching data.
 * @see {@link https://jsonapi.org/format/#fetching}
 * @see {@link isFetchResponse} ts-auto-guard:type-guard
 */
export type FetchResponse = FetchResourceResponse | FetchRelationshipResponse;

// -------------------- Fetching resources document --------------------

/**
 * JSON:API response document for fetching individual resource or collection of resources.
 * @see {@link https://jsonapi.org/format/#fetching-resources-responses}
 * @see {@link isFetchResourceResponse} ts-auto-guard:type-guard
 */
export type FetchResourceResponse =
  | FetchResourceIndividualResponse
  | FetchResourceCollectionResponse;

/**
 * JSON:API response document for fetching individual resource.
 * @example
 *     {
 *       "links": {
 *         "self": "http://example.com/articles/1"
 *       },
 *       "data": {
 *         "type": "articles",
 *         "id": "1",
 *         "attributes": {
 *           "title": "JSON:API paints my bikeshed!"
 *         },
 *         "relationships": {
 *           "author": {
 *             "links": {
 *               "related": "http://example.com/articles/1/author"
 *             }
 *           }
 *         }
 *       }
 *     }
 * @see {@link https://jsonapi.org/format/#fetching-resources-responses}
 * @see {@link isFetchResourceIndividualResponse} ts-auto-guard:type-guard
 */
export type FetchResourceIndividualResponse = {
  data: ResourceObject | null;
  included?: ResourceObject[];
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject;
};

/**
 * JSON:API response document for fetching collection of resources.
 * @example
 *     {
 *       "meta": {
 *         "totalPages": 13
 *       },
 *       "data": [
 *         {
 *           "type": "articles",
 *           "id": "3",
 *           "attributes": {
 *             "title": "JSON:API paints my bikeshed!",
 *             "body": "The shortest article. Ever.",
 *             "created": "2015-05-22T14:56:29.000Z",
 *             "updated": "2015-05-22T14:56:28.000Z"
 *           }
 *         }
 *       ],
 *       "links": {
 *         "self": "http://example.com/articles?page[number]=3&page[size]=1",
 *         "first": "http://example.com/articles?page[number]=1&page[size]=1",
 *         "prev": "http://example.com/articles?page[number]=2&page[size]=1",
 *         "next": "http://example.com/articles?page[number]=4&page[size]=1",
 *         "last": "http://example.com/articles?page[number]=13&page[size]=1"
 *       }
 *     }
 * @see {@link https://jsonapi.org/format/#fetching-resources-responses}
 * @see {@link isFetchResourceCollectionResponse} ts-auto-guard:type-guard
 */
export type FetchResourceCollectionResponse = {
  data: ResourceObject[];
  included?: ResourceObject[];
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject & PaginationLinks;
};

// -------------------- Fetching relationships document --------------------

/**
 * JSON:API response document for fetching to-one or to-many relationship.
 * @see {@link https://jsonapi.org/format/#fetching-relationships}
 * @see {@link isFetchRelationshipResponse} ts-auto-guard:type-guard
 */
export type FetchRelationshipResponse =
  | FetchRelationshipToOneResponse
  | FetchRelationshipToManyResponse;

/**
 * JSON:API response document for fetching to-one relationship.
 * @see {@link https://jsonapi.org/format/#fetching-relationships}
 * @see {@link isFetchRelationshipToOneResponse} ts-auto-guard:type-guard
 */
export type FetchRelationshipToOneResponse = {
  data: ResourceIdentifierObject | null;
  included?: ResourceObject[];
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject;
};

/**
 * JSON:API response document for fetching to-many relationship.
 * @see {@link https://jsonapi.org/format/#fetching-relationships}
 * @see {@link isFetchRelationshipToManyResponse} ts-auto-guard:type-guard
 */
export type FetchRelationshipToManyResponse = {
  data: ResourceIdentifierObject[];
  included?: ResourceObject[];
  meta?: MetaObject;
  jsonapi?: JsonApiObject;
  links?: LinksObject & PaginationLinks;
};

// -------------------- Creating resource --------------------

/**
 * JSON:API request document for creating resource.
 * @see {@link https://jsonapi.org/format/#crud-creating}
 * @see {@link isCreateResourceDocument} ts-auto-guard:type-guard
 */
export type CreateResourceDocument = {
  data: {
    id?: string;
    type: string;
    attributes?: AttributesObject;
    relationships?: RelationshipsObject;
  };
  meta?: MetaObject;
};

export type CreateResourceResponse = FetchResourceIndividualResponse | null;

// -------------------- Updating resource --------------------

/**
 * JSON:API request document for updating resource.
 * @see {@link https://jsonapi.org/format/#crud-updating}
 * @see {@link isUpdateResourceDocument} ts-auto-guard:type-guard
 */
export type UpdateResourceDocument = {
  data: ResourceObject;
  meta?: MetaObject;
};

export type UpdateResourceResponse =
  | FetchResourceIndividualResponse
  | MetaDocument
  | null;

// -------------------- Delete resource --------------------

export type DeleteResourceResponse = MetaDocument | null;

// -------------------- Updating relationship --------------------

/**
 * JSON:API request document for updating to-one or to-many relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-relationships}
 * @see {@link isUpdateRelationshipDocument} ts-auto-guard:type-guard
 */
export type UpdateRelationshipDocument =
  | UpdateRelationshipToOneDocument
  | UpdateRelationshipToManyDocument;

/**
 * JSON:API response document for updating to-one or to-many relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-relationships}
 * @see {@link isUpdateRelationshipResponse} ts-auto-guard:type-guard
 */
export type UpdateRelationshipResponse =
  | UpdateRelationshipToOneResponse
  | UpdateRelationshipToManyResponse;

// -------------------- Updating relationship to-one --------------------

/**
 * JSON:API request document for updating to-one relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-to-one-relationships}
 * @see {@link isUpdateRelationshipToOneDocument} ts-auto-guard:type-guard
 */
export type UpdateRelationshipToOneDocument = {
  data: ResourceIdentifierObject | null;
  meta?: MetaObject;
};

/**
 * JSON:API response document for updating to-one relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-to-one-relationships}
 * @see {@link isUpdateRelationshipToOneResponse} ts-auto-guard:type-guard
 */
export type UpdateRelationshipToOneResponse =
  | FetchRelationshipToOneResponse
  | MetaDocument
  | null;

// -------------------- Updating relationship to-many --------------------

/**
 * JSON:API request document for updating to-many relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-to-many-relationships}
 * @see {@link isUpdateRelationshipToManyDocument} ts-auto-guard:type-guard
 */
export type UpdateRelationshipToManyDocument = {
  data: ResourceIdentifierObject[];
  meta?: MetaObject;
};

/**
 * JSON:API response document for updating to-many relationship.
 * @see {@link https://jsonapi.org/format/#crud-updating-to-many-relationships}
 * @see {@link isUpdateRelationshipToManyResponse} ts-auto-guard:type-guard
 */
export type UpdateRelationshipToManyResponse =
  | FetchRelationshipToManyResponse
  | MetaDocument
  | null;
