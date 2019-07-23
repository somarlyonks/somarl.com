/// <reference types='folans.d.ts' />

interface IF {
  callees?: string[] // composed
  partially?: boolean // curried
  optag?: string // Operator
}

declare type FI<R=A> = ((...args: any[]) => R) & IF
declare type FI0<R> = (() => R) & IF
declare type FI1<T, R> = ((t: T) => R) & IF
declare type FI2<T1, T2, R> = ((t1: T1, t2: T2) => R) & IF
declare type FI3<T1, T2, T3, R> = ((t1: T1, t2: T2, t3: T3) => R) & IF

declare type P<T> = Promise<T>
