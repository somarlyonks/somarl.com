/// <reference types='folans.d.ts' />

interface IF {
  callees?: string[] // composed
  partially?: boolean // curried
}

declare type valueof<T> = T[keyof T]

declare type P<T = A> = Promise<T>
