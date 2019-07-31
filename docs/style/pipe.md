# Pipe

All other packages can import from `pipe` but `pipe` are not supposed to have any dependencies. Interfaces shared both backend and frontend are recommanded to be defined in `pipe`.

There are not many files in this repo are capatilized, one of them is `Adapter.ts`, which is deliberate for searching.

The `packages/pipe/src/Adapter.ts` are supposed to port the src of pipe, so the common signature in it is

```ts
export * from './fileA'
export * from './fileB'
export * from './fileC'

```

In other packages' `Adapter.ts`, port things on need and arrange them carefully

```ts
export {
  IA, TypeA,
  IC,
} from '@somarl.com/pipe'

```
