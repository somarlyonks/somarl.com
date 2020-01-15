
type IModifier = S | { [k: string]: A } | undefined | false

type IModifiers = L<IModifier>

declare function ElementBuilder (modifiers: IModifiers): S
declare function ElementBuilder (element: S, modifiers: IModifiers): S


export function bem (block: S): typeof ElementBuilder
export function bem (block: S, modifiers?: IModifiers): S
export function bem (block: S, element: S, modifiers?: IModifiers): S
export function bem (block: S, element?: S | IModifiers, modifiers: IModifiers = []): S | typeof ElementBuilder {
  function elementBuilder (_modifiers: IModifiers): S
  function elementBuilder (_element: S, _modifiers: IModifiers): S
  function elementBuilder (_element: S | IModifiers, _modifiers?: IModifiers): S {
    if (arguments.length === 1) {
      _modifiers = _element as IModifiers
      _element = ''
    }
    const prefix = `${block}${_element ? '__' + _element : ''}`

    return [prefix].concat(
      _modifiers!.filter(m => m).map(modifier => {
        if (typeof modifier === 'string') return `${prefix}--${modifier}`
        return Object.keys(modifier!).filter(key => modifier![key]).map(
          key => `${prefix}--${key}`
        ).join(' ')
      })
    ).join(' ')
  }
  if (arguments.length === 1) return elementBuilder
  if (arguments.length === 2) return elementBuilder('', element as IModifiers)
  return elementBuilder(element! as S, modifiers)
}
