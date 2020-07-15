import { h } from 'preact'

import { useRedux, actors, actor } from 'src/redux'


const API = async (x: S) => x
const API2 = async (x: N) => {
  if (Math.random() > (1 / 2)) throw Error('Testing Error handling')
  return x
}

export default function Consumer () {
  const { errMsgs, testCount } = useRedux(state => ({
    errMsgs: state.global.errMsgs,
    testCount: state.global.testCount,
  }))

  const ADec: h.JSX.MouseEventHandler<HTMLButtonElement> = event => actors.global.DECREMENT(API('1'))
  const AInc: h.JSX.MouseEventHandler<HTMLButtonElement> = event => actor({
    type: actor.types.global.INCREMENT,
    payload: API2(1),
  })

  return (
    <div>
      <p>{errMsgs}</p>
      <button onClick={ADec}>-</button>
      <span>{testCount}</span>
      <button onClick={AInc}>+</button>
    </div>
  )
}
