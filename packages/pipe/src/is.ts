/**
 * @file interal type check
 * @warn this is the most basic functions, don't quote other files
 * @desc use x is Type to support branches
 *       Why chose Object.prototype.toString to check ?
 *       It's not about efficiency, it's about extensive and configurable.
 *       You can never change the type signature of a name in JS.
 * @example
 *   function add (...xs) {
 *     const _add = (..._xs) => add(...xs.concat(_xs))
 *       _add[Symbol.toPrimitive] = () => xs.reduce((s, x) => s + x)
 *     return _add
 *   }
 *   const n = add(1, 2, 4) // function, but works like a number
 *   // What if I want isNumber(n) return ture ?
 *   // Just configure toStringTag of the _add
 *   // _add[Symbol.toStringTag] = 'Number'
 *   // and you get (toString(1) == toString(add(1)))
 */


const toString = (a: A): S => Reflect.apply(Object.prototype.toString, a, [])


export function isString (x: any): x is string {
  return toString(x) === '[object String]'
}


export function isFunction<T extends F<any>> (fn: any): fn is T {
  return !!fn && toString(fn) === '[object Function]'
}


export function isArray (array: any): array is any[] {
  return Array.isArray(array)
}


/**
 * @attention isNaN([]) === false
 *            Number([]) === 0
 *            Number([1]) === 1
 *            Number([0, 1]) === NaN
 *            Number({}) === NaN
 *            Number('') === 0
 *            Number('1') === 1
 *            Number(true) === 1
 *            Number(false) === 0
 *            typeof NaN === 'number'
 *            isNaN(NaN) === true
 *            !!(NaN == NaN) == false
 *            !!(NaN === NaN) === false
 *            !!(0 === fasle) === fasle
 *            !!(1 === true) === fasle
 */
export function isNumber (n: any): n is number {
  return toString(n) === '[object Number]'
}


export function isBoolean (b: any): b is boolean {
  return b === true || b === false || toString(b) === '[object Boolean]'
}


export function isObject (o: any): o is object {
  const t = typeof o
  return t === 'function' || t === 'object' && !!o
}
