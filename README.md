# JSON:API metal client

Bare metal TypeScript and JavaScript client for web API implementing [JSON:API v1.0](https://jsonapi.org/).

- Zero dependency
- Type-safe
- Isomorphic

---

## Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
  + [HTTP adapter](#http-adapter)
    - [Using `fetch`](#using--fetch-)
  + [Client](#client)
    - [Configure custom HTTP headers](#configure-custom-http-headers)
    - [Result](#result)
    - [Specification](#specification)
* [Development](#development)
* [License](#license)

## Requirements

- ES6 (ECMAScript 2015)

## Installation

Using _npm_:

```shell
npm install -s jsonapi-metal-client
```

Using _yarn_:

```shell
yarn add jsonapi-metal-client
```

With ES6 modules:

```js
import { HttpAdapters, JsonApi } from 'jsonapi-metal-client';
```

With CommonJS modules:

```js
const { HttpAdapters, JsonApi } = require('jsonapi-metal-client');
```

## Usage

```js
const httpAdapter = new HttpAdapters.FetchHttpAdapter(window.fetch.bind(window));
const client = new JsonApi.Client(httpAdapter);

// Fetch a resource collection.
client.fetch('https://example.com/articles');
client.fetchResource('https://example.com/articles');
client.fetchResourceCollection('https://example.com/articles');

// Fetch an individual resource.
client.fetch('https://example.com/articles/1');
client.fetchResource('https://example.com/articles/1');
client.fetchResourceIndividual('https://example.com/articles/1');

// Fetch relationship data representing a to-one relationship.
client.fetch('https://example.com/articles/1/relationships/author');
client.fetchRelationship('https://example.com/articles/1/relationships/author');
client.fetchRelationshipToOne('https://example.com/articles/1/relationships/author');

// Fetch relationship data representing a to-many relationship.
client.fetch('https://example.com/articles/1/relationships/comments');
client.fetchRelationship('https://example.com/articles/1/relationships/comments');
client.fetchRelationshipToMany('https://example.com/articles/1/relationships/comments');

// Create a resource.
client.createResource(
  'https://example.com/comments',
  {
    data: {
      type: 'photos',
      attributes: {
        title: 'Ember Hamster',
        src: 'http://example.com/images/productivity.png'
      },
      relationships: {
        photographer: {
          data: { type: 'people', id: '9' }
        }
      }
    }
  }
);

// Update a resource.
client.updateResource(
  'https://example.com/articles/1',
  {
    data: {
      type: 'articles',
      id: '1',
      attributes: {
        title: 'To TDD or Not'
      }
    }
  }
);

// Delete a resource.
client.deleteResource('https://example.com/photos/1');

// Update a to-one relationship.
client.updateRelationshipToOne(
  'https://example.com/articles/1/relationships/author',
  {
    data: { type: 'people', id: '12' }
  }
);

// Add a member to a to-many relationship.
client.createRelationshipToMany(
  'https://example.com/articles/1/relationships/comments',
  {
    data: [
      { type: 'comments', id: '123' }
    ]
  }
);

// Replace all members of a to-many relationship.
client.updateRelationshipToMany(
  'https://example.com/articles/1/relationships/tags',
  {
    data: []
  }
);

// Remove members from a to-many relationship.
client.deleteRelationshipToMany(
  'https://example.com/articles/1/relationships/comments',
  {
    data: [
      { type: 'comments', id: '12' },
      { type: 'comments', id: '13' }
    ]
  }
);
```

## Documentation

- [Typescript documentation](#)

### HTTP adapter

#### Using `fetch`

HTTP Adapter using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```js
const httpAdapter = new HttpAdapters.FetchHttpAdapter(
  window.fetch.bind(window)
);
```

For Node.js you can install [cross-fetch](https://www.npmjs.com/package/cross-fetch), or other implementations.

```js
const fetch = require('cross-fetch');

const httpAdapter = new HttpAdapters.FetchHttpAdapter(
  fetch
);
```

### Client

Set the HTTP adapter.

```js
const client = new JsonApi.Client(httpAdapter);
```

#### Configure custom HTTP headers

Set default HTTP headers to apply to each HTTP requests.

```ts
const username = 'username';
const password = 'password';
const defaultHttpHeaders = {
  'Authorization': 'Basic ' + btoa(username + ':' + password)
};

const client = new JsonApi.Client(httpAdapter, defaultHttpHeaders);

client.defaultHttpHeaders['x-foo'] = 'bar';

console.log(client.defaultHttpHeaders);
// { Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=', 'x-foo': 'bar' }
```

#### Result

The client returns a Promise that resolves with a `Result` for JSON:API operations with contains the properties:

| Name        | Type      | Description |
|-------------|-----------|-------------|
| `isSuccess` | *boolean* | whether the operation is successful. |
| `document`  | *object*  | JSON:API document. |
| `request`   | *object*  | HTTP request representation. |
| `response`  | *object*  | HTTP response representation. |

```js
const result = await client.fetch('http://examples.com/articles/1');
console.log(result)
// {
//   isSuccess: true,
//   document: {
//     links: {
//       self: "http://example.com/articles/1"
//     },
//     data: {
//       type: "articles",
//       id: "1",
//       attributes: {
//         title: "JSON:API paints my bikeshed!"
//       },
//       relationships: {
//         author: {
//           links: {
//             related: "http://example.com/articles/1/author"
//           }
//         }
//       }
//     }
//   },
//   request: {
//     url: 'http://examples.com/articles/1',
//     headers: {
//       Accept: 'application/vnd.api+json'
//     },
//     method: 'GET',
//     body: null
//   },
//   response: {
//     status: 200,
//     body: '{"type":"articles","id":"1","attributes":{"title":"JSON:API paints my bikeshed!"},"relationships":{"author":{"links":{"related":"http://example.com/articles/1/author"}}}}',
//     headers: {
//       'content-type': 'application/vnd.api+json; charset=utf-8',
//       etag: 'W/"47a7cbaefdec0639404a5946676f6e95"'
//     }
//   }
// }
```

#### Specification

There are some [type guards (type predicats)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) that can be used to inspect the kind of JSON:API document.

```js
import { JsonApi } from 'jsonapi-metal-client';

const {
  isFetchResponse
  isFetchResourceResponse
  isFetchResourceIndividualResponse
  isErrorDocument
} = JsonApi.Specification.TypeGuards

const result = await client.fetch('http://examples.com/articles/1');
if (result.isSuccess) {
  isFetchResponse(result.document)
  isFetchResourceResponse(result.document)
  isFetchResourceIndividualResponse(result.document)
  // true
} else {
  if (result.document) {
    isErrorDocument(result.document)
    // true
  }
}
```

## Development

Requirements:
- Yarn

### Type Guards

Generate [type guards (type predicats)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).

```shell
yarn type-guards
```

### Documentation

Generate documentation using [TypeDoc](https://typedoc.org/):

```shell
yarn documentation
```

### Lint

Executing lint check using [ESLint](https://eslint.org/):

```shell
yarn lint
```

Executing lint fix using [ESLint](https://eslint.org/):

```shell
yarn format
```

### Test

Executing [Jest](https://jestjs.io/) test suite:

```shell
yarn test
```

## License

[MIT](./LICENSE)
