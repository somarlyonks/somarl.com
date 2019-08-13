# Server

## framework

The server is mostly based on ['NestJS'](https://nestjs.com/) with GraphQL to ArangoDB. It also provides some proxies to public Apis.

```bash
.
├── server.ts
├── settings.ts
└── src
     ├── arango
     │    ├── entity.ts
     │    ├── repo.ts
     │    ├── module.ts
     │    └── decorators.ts
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
     │    ├── module.ts
     │    ├── schema.gql
     │    ├── shared
     │    ├── recipe
     │    │    ├── dto
     │    │    ├── models.ts
     │    │    ├── repos.ts
     │    │    ├── module.ts
     │    │    ├── resolver.ts
     │    │    └── service.ts
     │    └── ...
     ├── shared
     │    ├── controllers
     │    ├── modules
     │    └── services
     └...
```

The business code template:

- `module -> service -> repo -> model/entity`.
- Services are supposed to have no access to database but with the help of repo.
- Repos are supposed to have no awareness to business circumstances but capable of specific manipulations to the database.
- Model are first defined datamodel. Entity is the data travelling around the business codes.

So the development procedure is like:

- Define the model / dto / resolver (things shared and importabled)
- Define the specs (interfaces)
- `npm run create-collection -- -c collectionname`
- Implement the specs (injectables)
- Test the specs and implementations

## GraphQL/ArangoDB with ts

The core here is, how to make sure there's only one single truth source? And ts makes it more complicated, how to keep the only source provides enough informations to all kinds of consumers?

Finally, the framework relies much much on the [TypeGraphQL](https://github.com/19majkel94/type-graphql) and a handcrafted arango interface.

You should define api in sub-directories of `packages/server/src` just like the `recipe`. When server bootstraps it generates `packages/server/src/graphql/schema.gql` which will then genenrate typings to `packages/pipe/src/graphql.ts` which will be exported from `Adapters.ts`.
