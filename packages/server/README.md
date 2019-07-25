# somarl.som minimal server

Serves as a basic server and provides with some proxied public Apis.

## framework

The server is mostly based on ['NestJS'](https://nestjs.com/) with GraphQL to MongoDB. It also provides some proxies to public Apis.

```bash
.
├── server.ts
├── settings.ts
└── src
     ├── app
     │    ├── middlewares
     │    ├── controller.ts
     │    ├── module.ts
     │    └── service.ts
     ├── api
     │    ├── controller.ts
     │    ├── module.ts
     │    └── service.ts
     ├── graphql
     │    ├── shared
     │    ├── ...
     │    ├── generate-typings.ts
     │    └── schema.gql
     ├── shared
     │    ├── controllers
     │    ├── modules
     │    └── services
     └...
```

## GraphQL with ts

How to make sure there's only one single truth source?

You should define api in sub-directories of `packages/server/src` just like the `recipe`. When server bootstraps it generates `packages/server/src/graphql/schema.gql` which will then genenrate typings to `packages/pipe/src/graphql.ts` which will be exported from `Adapters.ts`.

## Api

### blacksky
