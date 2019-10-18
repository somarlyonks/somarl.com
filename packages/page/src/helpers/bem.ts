type IModifier = S | { [k: string]: A } | undefined | false

function bem (block: S): F2<S, L<IModifier>, S>
function bem (block: S, element: S, modifiers?: L<IModifier>): S
function bem (block: S, element?: S, modifiers: L<IModifier> = []): S | F2<S, L<IModifier>, S> {
  const curried = (_element: S, _modifiers: L<IModifier> = []) => {
    const prefix = `${block}${_element ? '__' + _element : ''}`
    const segments = [prefix].concat(_modifiers
      .reduce((r: L<S>, m) => r.concat(
        !m ? [] : typeof m === 'string'
          ? [m]
          : Object.entries(m).filter(([k, v]) => !!v).map(([k, v]) => k)
      ), [])
      .map(m => `${prefix}--${m}`)
    )

    return segments.join(' ')
  }
  if (arguments.length === 1) return curried
  return curried(element!, modifiers)
}

export default bem
