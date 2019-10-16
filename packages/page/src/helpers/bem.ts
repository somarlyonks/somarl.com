type IModifier = S | undefined | false

function bem (block: S): F2<S, L<IModifier>, S>
function bem (block: S, element: S, modifiers?: L<IModifier>): S
function bem (block: S, element?: S, modifiers: L<IModifier> = []): S | F2<S, L<IModifier>, S> {
  const curried = (_element: S, _modifiers: L<IModifier> = []) => {
    const prefix = `${block}${_element ? '__' + _element : ''}`
    const segments = [prefix].concat(
      _modifiers.filter(m => !!m).map(m => `${prefix}--${m}`)
    )

    return segments.join(' ')
  }
  if (arguments.length === 1) return curried
  return curried(element!, modifiers)
}

export default bem
