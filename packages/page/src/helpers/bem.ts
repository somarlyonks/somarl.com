export default function bem (block: S, element: S, modifiers: L<S | undefined | false> = []) {
  const prefix = `${block}__${element}`
  const segments = [prefix].concat(modifiers
    .filter(m => !!m)
    .map(m => `${prefix}--${m}`)
  )

  return segments.join(' ')
}
