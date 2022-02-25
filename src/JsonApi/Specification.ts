import * as TypeGuards from './Specification.TypeGuards';

export { TypeGuards };

// -------------------- Document members --------------------

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
export type MetaObject = { [key: string]: any };

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
  version?: string;
  meta?: MetaObject;
};

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
  type: string;
  id: string;
  meta?: MetaObject;
};

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
  href?: string;
  meta?: MetaObject;
};

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
export type Link = string | LinkObject;

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
  [key: string]: Link;
};

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
  first?: Link | null;
  last?: Link | null;
  prev?: Link | null;
  next?: Link | null;
};

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
  [key: string]: any;
};

/**
 * JSON:API "relationship object" member "links".
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipObjectLinks} ts-auto-guard:type-guard
 */
export type RelationshipObjectLinks =
  | (LinksObject & { self: Link })
  | (LinksObject & { related: Link });

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
export type RelationshipToOneObject =
  | {
      links: RelationshipObjectLinks;
      data?: ResourceIdentifierObject | null;
      meta?: MetaObject;
    }
  | {
      links?: RelationshipObjectLinks;
      data: ResourceIdentifierObject | null;
      meta?: MetaObject;
    }
  | {
      links?: RelationshipObjectLinks;
      data?: ResourceIdentifierObject | null;
      meta: MetaObject;
    };

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
export type RelationshipToManyObject =
  | {
      links: RelationshipObjectLinks & PaginationLinks;
      data?: ResourceIdentifierObject[];
      meta?: MetaObject;
    }
  | {
      links?: RelationshipObjectLinks & PaginationLinks;
      data: ResourceIdentifierObject[];
      meta?: MetaObject;
    }
  | {
      links?: RelationshipObjectLinks & PaginationLinks;
      data?: ResourceIdentifierObject[];
      meta: MetaObject;
    };

/**
 * JSON:API "relationship object" that represents references from the resource object in which it’s defined to other resource objects.
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipObject} ts-auto-guard:type-guard
 */
export type RelationshipObject =
  | RelationshipToOneObject
  | RelationshipToManyObject;

/**
 * JSON:API "relationships object".
 * @see {@link https://jsonapi.org/format/#document-resource-object-relationships}
 * @see {@link isRelationshipsObject} ts-auto-guard:type-guard
 */
export type RelationshipsObject = {
  [key: string]: RelationshipObject;
};

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
 *       },
 *       "links": {
 *         "self": "http://example.com/articles/1"
 *       }
 *     }
 * @see {@link https://jsonapi.org/format/#document-resource-objects}
 * @see {@link isResourceObject} ts-auto-guard:type-guard
 */
export type ResourceObject = {
  id: string;
  type: string;
  attributes?: AttributesObject;
  relationships?: RelationshipsObject;
  links?: LinkObject;
};

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
  id?: any;
  links?: {
    abount: Link;
  };
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  meta?: MetaObject;
};

// -------------------- Document --------------------

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
