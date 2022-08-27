/// <reference types='folans.d.ts' />

/**
 * @example
 *   const xs = ['x', 'y'] as const
 *   const x: C<typeof xs> = 'z'
 */
type C<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer Consts> ? Consts : never

type P<T = A> = Promise<T>

type Resolved<TSource> = TSource extends P<infer RSource>
    ? RSource
    : {[K in keyof TSource]: Resolved<TSource[K]>}

/**
 * @description explicit type of any
 * @deprecated avoid using it anyway
 */
type ANY = any
