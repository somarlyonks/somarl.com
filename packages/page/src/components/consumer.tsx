import { h } from 'preact'

import store, { useRedux, ActionTypes, actionProxy } from 'src/redux'


const API = async (x: S) => x
const API2 = async (x: N) => {
  if (Math.random() > (1 / 2)) throw Error('Testing Error handling')
  return x
}
const incN = actionProxy(ActionTypes.global.INCREMENT, API2)

export default function Consumer () {
  const { errMsgs, testCount } = useRedux(state => ({
    errMsgs: state.global.errMsgs,
    testCount: state.global.testCount,
  }))

  const ADec: h.JSX.MouseEventHandler<HTMLButtonElement> = event => store.dispatch({
    type: ActionTypes.global.DECREMENT,
    payload: API('1'),
  })
  const AInc: h.JSX.MouseEventHandler<HTMLButtonElement> = event => store.dispatch(incN(1))

  return (
    <div>
      <p>{errMsgs}</p>
      <button onClick={ADec}>-</button>
      <span>{testCount}</span>
      <button onClick={AInc}>+</button>
    </div>
  )
}
