export default function bem (block: S, element: S, modifiers: O = {}) {
  const prefix = `${block}${element ? '__' + element : ''}`
  const segments = [prefix].concat(Object.keys(modifiers)
    .filter(k => !!modifiers[k])
    .map(k => `${prefix}--${k}`)
  )

  return segments.join(' ')
}
