/// <reference types='folans.d.ts' />

/**
 * @example
 *   const xs = ['x', 'y'] as const
 *   const x: C<typeof xs> = 'z'
 */
type C<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer Consts> ? Consts : never

type P<T = A> = Promise<T>

/** returned type of a function */
type R<T> = T extends F<infer RR> ? RR : never

type Resolved<TSource> = TSource extends P<infer RSource>
  ? RSource
  : { [K in keyof TSource]: Resolved<TSource[K]> }

interface IV2 {
  x: N
  y: N
}

interface IV3 extends IVect2 {
  z: N
}

type TargetElement = Element | EventTarget | null
