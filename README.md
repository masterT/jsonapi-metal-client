# JSON:API client

TypeScript and JavaScript client for web API implementing [JSON:API v1.0](https://jsonapi.org/).

- Zero dependency
- Type-safe
- Isomorphic

## Requirements

...

## Installation

...

## Usage

```ts
import { HttpAdapters, JsonApi } from 'jsonapi-client'

const httpAdapter = new HttpAdapters.FetchHttpAdapter(fetch)
const client = new JsonApi.Client(httpAdapter, {
  'Authorization': 'Basic ' + btoa(username + ':' + password)
})

const result = await client.fetch('https://example.com/articles')
if (result.isSuccess) {
  console.log(result.document)
  /**
  /* {
  /*   "links": {
  /*     "self": "https://example.com/articles"
  /*   },
  /*   "data": [{
  /*     "type": "articles",
  /*     "id": "1",
  /*     "attributes": {
  /*       "title": "JSON:API paints my bikeshed!"
  /*     }
  /*   }, {
  /*     "type": "articles",
  /*     "id": "2",
  /*     "attributes": {
  /*       "title": "Rails is Omakase"
  /*     }
  /*   }]
  /* }
  **/
}
```

## Documentation

...

## Development

Requirements:
- Yarn

### Type Guards

Generate [type guards (type predicats)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) for the library's [interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces).

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

Executing test suite using [Jest](https://jestjs.io/):

```shell
yarn test
```

## License

[MIT](./LICENSE)
