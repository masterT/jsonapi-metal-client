import * as TypeGuards from './Document.TypeGuards'
import {
  AttributesObject,
  ErrorObject,
  JsonApiObject,
  LinksObject,
  MetaObject,
  RelationshipsObject,
  ResourceIdentifierObject,
  ResourceObject
} from './DocumentMember'

export { TypeGuards }

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

export type CreateResourceDocumentResponse = FetchResourceIndividualResponse | null


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

export type UpdateResourceDocumentResponse = FetchResourceIndividualResponse | MetaDocument | null


// -------------------- Delete resource --------------------

export type DeleteResourceDocumentResponse = MetaDocument | null


// -------------------- Updating relationship --------------------

 /**
  * JSON:API request document for updating to-one or to-many relationship.
  * @see {@link https://jsonapi.org/format/#crud-updating-relationships}
  * @see {isUpdateRelationshipDocument} ts-auto-guard:type-guard
  */
export type UpdateRelationshipDocument = UpdateRelationshipToOneDocument | UpdateRelationshipToManyDocument

 /**
  * JSON:API response document for updating to-one or to-many relationship.
  * @see {@link https://jsonapi.org/format/#crud-updating-relationships}
  * @see {isUpdateRelationshipDocumentResponse} ts-auto-guard:type-guard
  */
export type UpdateRelationshipDocumentResponse = UpdateRelationshipToOneDocumentResponse | UpdateRelationshipToManyDocumentResponse


// -------------------- Updating relationship to-one --------------------

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
  * JSON:API response document for updating to-one relationship.
  * @see {@link https://jsonapi.org/format/#crud-updating-to-one-relationships}
  * @see {isUpdateRelationshipToOneDocumentResponse} ts-auto-guard:type-guard
  */
 export type UpdateRelationshipToOneDocumentResponse = FetchRelationshipToOneResponse | MetaDocument | null


// -------------------- Updating relationship to-many --------------------

 /**
  * JSON:API request document for updating to-many relationship.
  * @see {@link https://jsonapi.org/format/#crud-updating-to-many-relationships}
  * @see {isUpdateRelationshipToManyDocument} ts-auto-guard:type-guard
  */
 export type UpdateRelationshipToManyDocument = {
   data: ResourceIdentifierObject[]
   meta?: MetaObject
 }

/**
  * JSON:API response document for updating to-many relationship.
  * @see {@link https://jsonapi.org/format/#crud-updating-to-many-relationships}
  * @see {isUpdateRelationshipToManyDocumentResponse} ts-auto-guard:type-guard
  */
export type UpdateRelationshipToManyDocumentResponse = FetchRelationshipToManyResponse | MetaDocument | null
