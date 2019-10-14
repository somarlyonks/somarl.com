function bem (block: S): F2<S, O, S>
function bem (block: S, element: S, modifiers?: O): S
function bem (block: S, element?: S, modifiers: O = {}): S | F2<S, O, S> {
  const curried = (_element: S, _modifiers: O = {}) => {
    const prefix = `${block}${_element ? '__' + _element : ''}`
    const segments = [prefix].concat(Object.keys(_modifiers)
      .filter(k => !!_modifiers[k])
      .map(k => `${prefix}--${k}`)
    )

    return segments.join(' ')
  }
  if (arguments.length === 1) return curried
  return curried(element!, modifiers)
}

export default bem
