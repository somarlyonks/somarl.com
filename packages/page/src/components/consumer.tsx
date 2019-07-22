import { h, JSX } from 'preact'
import { useCallback } from 'preact/hooks'
import store, { IImplState, StoreContext, useMappedState, ActionTypes } from '../redux/store'
import { action } from 'src/redux/store/helpers'


/** TODO: move this to test */
const API = async (x: S) => x
const API2 = async (x: N) => x
const incN = action(ActionTypes.global.INCREMENT, API2)

const Consumer = () => {
  const { global } = useMappedState(useCallback((state: IImplState) => state, []))

  const ADec: JSX.MouseEventHandler = event => store.dispatch({
    type: ActionTypes.global.DECREMENT,
    payload: API('1'),
  })
  const AInc: JSX.MouseEventHandler = event => store.dispatch(incN(1))

  return (
    <StoreContext.Provider value={store}>
      <button onClick={ADec}>-</button>
      <span>{global}</span>
      <button onClick={AInc}>+</button>
    </StoreContext.Provider>
  )
}

export default Consumer
