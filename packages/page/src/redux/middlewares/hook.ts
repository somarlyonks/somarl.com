import { createContext, Context as IContext } from 'preact'
import { useContext, useMemo, useReducer, useRef, useLayoutEffect, useEffect } from 'preact/hooks'
import { IStore, IAction, IDispatcher } from '../lib'
import shallowEqual from '../../helpers/shallowEqual'


const useIsomorphicLayoutEffect = window ? useLayoutEffect : useEffect

class MissingProviderError extends Error {
  public constructor () {
    super('<StoreContext.Provider> supposed to pass the context as value')
  }
}

function memoizeSingleArg <T, R> (fn: F1<T, R>): F1<T, R> {
  let value: R
  let prevArg: T

  return (arg: T) => {
    if (prevArg !== arg) {
      prevArg = arg
      value = fn(arg)
    }
    return value
  }
}

export function create<
  TState,
  TAction extends IAction,
  TStore extends IStore<TState, TAction>
> (store: TStore): {
  StoreContext: IContext<TStore>
  useMappedState: <TResult>(mapState: (state: TState) => TResult) => TResult
  useDispatch: () => IDispatcher<TAction>
} {
  const StoreContext = createContext(store)

  function useMappedState<TResult> (
    mapState: (state: TState) => TResult
  ): TResult {
    const _store = useContext(StoreContext)
    if (!_store) throw new MissingProviderError()

    const memoizedMapState = useMemo(() => memoizeSingleArg(mapState), [mapState])

    const state = _store.getState()!
    const derivedState = memoizedMapState(state)

    const [, forceUpdate] = useReducer(x => x + 1, 0)

    const lastStateRef = useRef(derivedState)
    const memoizedMapStateRef = useRef(memoizedMapState)

    useIsomorphicLayoutEffect(() => {
      lastStateRef.current = derivedState
      memoizedMapStateRef.current = memoizedMapState
    })

    useIsomorphicLayoutEffect(() => {
      let didUnsubscribe = false

      const checkForUpdates = () => {
        if (didUnsubscribe) return

        const newDerivedState = memoizedMapStateRef.current(_store.getState()!)

        if (!shallowEqual(newDerivedState, lastStateRef.current)) {
          (forceUpdate as F0<void>)()
        }
      }

      checkForUpdates()
      const unsubscribe = _store.subscribe(checkForUpdates)

      return () => {
        didUnsubscribe = true
        unsubscribe()
      }
    }, [_store])

    return derivedState
  }

  function useDispatch (): IDispatcher<TAction> {
    const _store = useContext(StoreContext)
    if (!_store) {
      throw new MissingProviderError()
    }
    return _store.dispatch
  }

  return {
    StoreContext,
    useDispatch,
    useMappedState,
  }
}
