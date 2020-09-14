
type IModifier = S | undefined | false

type IModifiers = L<IModifier> | Record<S, IModifier | true>

interface IElementBuilder {
  (element: S, modifiers: IModifiers): S
}


export function bem (block: S): IElementBuilder
export function bem (block: S, element: S, modifiers: IModifiers): S
export function bem (block: S, element?: S, modifiers: IModifiers = []): S | IElementBuilder {
  function elementBuilder (_element: S, _modifiers: IModifiers = []): S {
    const prefix = `${block}${_element ? '__' + _element : ''}`

    if (!Array.isArray(_modifiers)) {
      _modifiers = Object.entries(_modifiers).map(([k, v]) => !!v && k)
    }

    return [prefix].concat(
      _modifiers.filter(m => m).map(modifier => `${prefix}--${modifier}`)
    ).join(' ')
  }
  if (arguments.length === 1) return elementBuilder
  return elementBuilder(element!, modifiers)
}
