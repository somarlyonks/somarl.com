export { clamp, compose } from './Adapter'

export const once = <T extends F>(f: T): T => {
  let run = false
  return ((...args: L<A>) => {
    if (run) return
    f(...args)
    run = true
  }) as A
}
