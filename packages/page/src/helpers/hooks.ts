
import { useState } from 'preact/hooks'

export function useBoolState (initialState = false): [boolean, F0, F0] {
  const [state, setState] = useState(initialState)
  const setTrue = () => setState(true)
  const setFalse = () => setState(false)

  return [state, setTrue, setFalse]
}
