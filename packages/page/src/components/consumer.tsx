import { h, JSX } from 'preact'
import { useCallback } from 'preact/hooks'
import { IStore } from '../redux/framework'
import { createContext } from '../redux/middleware'
import store, { actions, IImplState, IImplAction } from '../redux/store'

const { StoreContext, useMappedState } = createContext<IImplState, IImplAction, IStore<IImplState, IImplAction>>(store)

; (window as any).store = StoreContext
const ADec: JSX.MouseEventHandler = event => store.dispatch(actions.global.DECREMENT(1))
const AInc: JSX.MouseEventHandler = event => {
  store.dispatch(actions.global.INCREMENT(1))
  console.info(store.getState()!.global)
}

const Consumer = () => {
  const { global } = useMappedState(useCallback((state: IImplState) => state, []))
  return (
    <StoreContext.Provider value={store}>
      <button onClick={ADec}>-</button>
      <span>{global}</span>
      <button onClick={AInc}>+</button>
    </StoreContext.Provider>
  )
}

export default Consumer
