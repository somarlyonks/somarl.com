
export function makeMatcher (makeRegexpFn: typeof pathToRegexp = pathToRegexp): F2<S, S, [boolean, null | {}]> {
  const cache: Record<S, R<typeof pathToRegexp>> = {}

  // obtains a cached regexp version of the pattern
  const getRegexp = (pattern: S) =>
    (cache[pattern]) || (cache[pattern] = makeRegexpFn(pattern))

  return (pattern: S, path: S) => {
    const { regexp, keys } = getRegexp(pattern || '')
    const out = regexp.exec(path)

    if (!out) return [false, null]

    // formats an object with matched params
    const params = keys.reduce((r, key, i) => Object.assign(r, {[key.name]: out[i + 1]}), {})

    return [true, params]
  }
}

/** @see https://github.com/pillarjs/path-to-regexp/blob/v3.0.0/index.js#L202 */
const escapeRx = (str: S) => str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

// returns a segment representation in RegExp based on flags
// adapted and simplified version from path-to-regexp sources
const rxForSegment = (repeat: boolean, optional: boolean, prefix: boolean) => {
  let capture = repeat ? '((?:[^\\/]+?)(?:\\/(?:[^\\/]+?))*)' : '([^\\/]+?)'
  if (optional && prefix) capture = '(?:\\/' + capture + ')'
  return capture + (optional ? '?' : '')
}

const pathToRegexp = (pattern: S) => {
  const groupRx = /:([A-Za-z0-9_]+)([?+*]?)/g

  let match = null
  let lastIndex = 0
  let result = ''
  const keys = []

  // tslint:disable-next-line: no-conditional-assignment
  while ((match = groupRx.exec(pattern)) !== null) {
    const [ , segment, mod] = match

    // :foo  [1]      (  )
    // :foo? [0 - 1]  ( o)
    // :foo+ [1 - ∞]  (r )
    // :foo* [0 - ∞]  (ro)
    const repeat = mod === '+' || mod === '*'
    const optional = mod === '?' || mod === '*'
    const prefix = optional && pattern[match.index - 1] === '/' ? 1 : 0

    const prev = pattern.substring(lastIndex, match.index - prefix)

    keys.push({ name: segment })
    lastIndex = groupRx.lastIndex

    result += escapeRx(prev) + rxForSegment(repeat, optional, !!prefix)
  }

  result += escapeRx(pattern.substring(lastIndex))
  return { keys, regexp: new RegExp('^' + result + '(?:\\/)?$', 'i') }
}
