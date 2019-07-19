const hasOwn = Object.prototype.hasOwnProperty

function is (x: A, y: A) {
  if (x === y) return x !== 0 || y !== 0 || 1 / x === 1 / y
  return x !== x && y !== y
}

/**
 * TODO: @sy migrate to immutable and reimplement this
 */
export default function shallowEqual (objA: A, objB: A) {
  if (is(objA, objB)) return true

  if (
    typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null
  ) return false

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) return false
  }

  return true
}
