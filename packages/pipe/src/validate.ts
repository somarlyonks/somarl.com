
export function isValidEmail (s: S) {
  const pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  return pattern.test(s)
}
