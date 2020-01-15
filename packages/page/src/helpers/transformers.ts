import { QINIU_URL } from './consts'


/* #abcdef => [171, 205, 239] */
export function hex2rgb (hex: S) {
  return (n => [1, 2, 3].map(c => n << (c * 8) >>> 24))(Number(hex.replace('#', '0x')))
}


export const completeHex = (s: S) => {
  if (s.length >= 7) return s.slice(0, 7)
  if (s.length === 6) return s + 'f'
  if (s.length === 5) return `${s.slice(0, 3)}${s[3]}${s[3]}${s[4]}${s[4]}`
  if (s.length === 4) return `${s.slice(0, 1)}${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`
  return s
}


/**
 * fixes campatibilities for shortcut rgba colors like rgba(#fff, 0.2) to rgba(255, 255, 255, 0.2)
 */
export function rgba (input: string): string {
  if (!input.startsWith('rgba(#')) return input

  const groups = input.replace('rgba(', '').replace(')', '').split(',').map((color: S) => color.trim())
  if (groups.length !== 2) return input

  const [hex, alpha] = groups

  return `rgba(${hex2rgb(completeHex(hex)).join(',')}, ${alpha})`
}


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


export function reduce <T> (arr: L<T>, acc: (r: T, c: T) => T): T
export function reduce <T, TR> (arr: L<T>, acc: (r: TR, c: T) => TR, init: TR): TR
export function reduce <T, TR> (arr: L<T>, acc: (r: TR, c: T) => TR, init?: TR) {
  if (arguments.length === 3) return arr.reduce<TR>(acc, init!)
  return arr.reduce(acc as unknown as (r: T, c: T) => T)
}


export function sum (...xs: L<L<N> | N>): N {
  return reduce(xs, (r, c) => r + (
    typeof c === 'number' ? c : sum(...c)
  ), 0)
}


export function qUrl (key: S) {
  return QINIU_URL + key
}
