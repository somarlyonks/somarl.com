export function randomString (length = 7, radix = 24) {
  return Math.random().toString(radix).substring(length)
}
