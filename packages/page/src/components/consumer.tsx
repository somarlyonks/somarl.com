import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import store, { IImplState, useMappedState, ActionTypes, actionProxy } from 'src/redux'


const API = async (x: S) => x
const API2 = async (x: N) => {
  if (Math.random() > (1 / 2)) throw Error('Testing Error handling')
  return x
}
const incN = actionProxy(ActionTypes.global.INCREMENT, API2)

const Consumer = () => {
  const { global } = useMappedState(useCallback((state: IImplState) => state, []))

  const ADec: h.JSX.MouseEventHandler = event => store.dispatch({
    type: ActionTypes.global.DECREMENT,
    payload: API('1'),
  })
  const AInc: h.JSX.MouseEventHandler = event => store.dispatch(incN(1))

  return (
    <div>
      <p>{global.errMsgs}</p>
      <button onClick={ADec}>-</button>
      <span>{global.testCount}</span>
      <button onClick={AInc}>+</button>
    </div>
  )
}

export default Consumer
