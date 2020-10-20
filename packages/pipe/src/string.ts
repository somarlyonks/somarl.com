
export function randomString (radix = 24) {
  return Math.random().toString(radix).substring(2)
}


export function capitalize (s: S): S
export function capitalize (s: S, locale?: S): S {
  if (arguments.length === 2) {
    const [c, ...r] = s
    return [c.toLocaleUpperCase(locale), ...r].join('')
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}
