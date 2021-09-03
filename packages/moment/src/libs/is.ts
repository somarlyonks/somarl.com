export function isPromise (obj: A): obj is P<A> {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
