interface IF {
  callees?: string[] // composed
  partially?: boolean // curried
}

declare type valueof<T> = T[keyof T]


declare type F<R> = ((...args: any[]) => R) & IF

declare type F0<R> = (() => R) & IF

declare type F1<T, R> = ((t: T) => R) & IF

declare type F2<T1, T2, R> = ((t1: T1, t2: T2) => R) & IF

declare type F3<T1, T2, T3, R> = ((t1: T1, t2: T2, t3: T3) => R) & IF


declare type N = number

declare type S = string

declare type L<T = any> = T[]

declare type O = {}

declare type A = any
