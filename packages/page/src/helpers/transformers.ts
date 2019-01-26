/* tslint:disable: no-magic-numbers */

/* #abcdef => [171, 205, 239] */
export const hex2rgb = (hex: S) =>
  (n => [1, 2, 3].map(c => n << (c * 8) >>> 24))(Number(hex.replace('#', '0x')))


export function revertObject <T extends { [_: string]: S }> (obj: T): { [_: string]: L<S> }
export function revertObject (obj: object) {
  const ret = {}
  for (const key in obj) {
    ret[obj[key]] = (ret[obj[key]] || []).concat(key)
  }

  return ret
}


export function format (src: S, width: N, align: 'L'|'C'|'R' = 'L') {
  width = width || src.length
  const template = Array(width).fill(' ')
  const padding = (width - src.length) / { C: 2, R: 1 }[align] | 0 || 0

  return template.map((_, i) => src[i - padding] || _).join('')
}


export function reduce <T> (arr: L<T>, acc: (r: T, c: T) => T) {
  return arr.reduce(acc)
}


export function sum (arr: L<N>) {
  return reduce(arr, (r, c) => r + c)
}
