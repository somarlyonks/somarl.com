export function clamp (n: N, min: N, max: N) {
  if (n < min) return min
  if (n > max) return max
  return n
}
