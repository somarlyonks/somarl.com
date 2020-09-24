
import { Inputs, useMemo, useReducer, useState } from 'preact/hooks'
import { bem } from '@somarlyonks/bem'

export function useBoolState (initialState = false): [boolean, F0, F0] {
  const [state, setState] = useState(initialState)
  const setTrue = () => setState(true)
  const setFalse = () => setState(false)

  return [state, setTrue, setFalse]
}


type IModifier = S | undefined | false
type IModifiers = IModifier[] | Record<S, IModifier | true>

export function useBem (block: S, element: S, modifiers: IModifiers = [], inputs: Inputs = []) {
  if (arguments.length === 3) {
    inputs = Array.isArray(modifiers) ? modifiers : Object.values(modifiers)
  }

  return useMemo(() => {
    console.info('recalc class')
    return bem(block, element, modifiers)
  }, inputs)
}


export function useRerender () {
  const [, rerender] = useReducer(x => x + 1, 0)

  return rerender as F0<void>
}
