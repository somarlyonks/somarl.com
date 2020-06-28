
export function randomString (length = 7, radix = 24) {
  return Math.random().toString(radix).substring(length)
}


export function capitalize (s: S): S
export function capitalize (s: S, locale?: S): S {
  if (arguments.length === 2) {
    const [c, ...r] = s
    return [c.toLocaleUpperCase(locale), ...r].join('')
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}
