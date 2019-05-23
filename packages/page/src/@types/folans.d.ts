/// <reference types='folans.d.ts' />

/**
 * @example
 *   const xs = ['x', 'y'] as const
 *   const x: C<typeof xs> = 'z'
 */
type C<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer Consts> ? Consts : never
