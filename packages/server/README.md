# somarl.som minimal server

## framework

The server is mostly based on ['NestJS'](https://nestjs.com/) with GraphQL to MongoDB. It also provides some proxies to public Apis.

```bash
.
├── server.ts
├── settings.ts
└── src
     ├── mongo
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
     │    ├── generate-typings.ts
     │    ├── schema.gql
     │    ├── shared
     │    ├── recipe
     │    │    ├── dto
     │    │    ├── model.ts
     │    │    ├── module.ts
     │    │    ├── repo.ts
     │    │    ├── resolver.ts
     │    │    └── service.ts
     │    └── ...
     ├── shared
     │    ├── controllers
     │    ├── modules
     │    └── services
     └...
```

## GraphQL/MongoDB with ts

The core here is, how to make sure there's only one single truth source? And ts makes it more complicated, how to keep the only source provides enough informations to all kinds of consumers?

You may wonder where is the `mongoose`? There is no such a thing here. The lib is a little bit rotten and incompatible to GraphQL and typescript. It just makes one typed source impossible as far as I'm concerned.

Finally, the framework relies much much on the [TypeGraphQL](https://github.com/19majkel94/type-graphql) and a handcrafted mongo interface.

You should define api in sub-directories of `packages/server/src` just like the `recipe`. When server bootstraps it generates `packages/server/src/graphql/schema.gql` which will then genenrate typings to `packages/pipe/src/graphql.ts` which will be exported from `Adapters.ts`.

## Api

### blacksky
