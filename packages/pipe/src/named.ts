/**
 * @impure / actually pure
 * @desc Change the name of an object forcely
 *       Be care that the named object is the same object inserted
 *       It could be used to keep the trace of callstack or check identities
 *       It's useful for composed or curried functions as anonymous functions
 *       are processed before implictly named
 * @example
 *       const f1 = x => x                      // f1.name = 'f1'
 *       const f2 = f1(x => x)                  // f2.name = ''
 *       const f3 = named('f3')(f2(f1(x => x))) // f3.name = 'f3'
 */
export function named <T> (value: string, o: T): T
export function named (value: string): <T>(o: T) => T
export function named (value: string, o?: object) {
  return o === undefined
    ? (oo: object) => Object.defineProperty(oo, 'name', { value })
    : Object.defineProperty(o, 'name', { value })
}
