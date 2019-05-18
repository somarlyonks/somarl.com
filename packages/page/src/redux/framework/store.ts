import { IReducer, IAction, IStoreFactoryAttach, IStore, IListener } from './shared'


// tslint:disable-next-line: no-magic-numbers
const randomString = () => Math.random().toString(36).substring(7).split('').join('.')

// inner actions
const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`,
}

export function createStore<TState, TAction extends IAction> (
  reducer: IReducer<TState, TAction>,
  attach: IStoreFactoryAttach<TState> = {}
): IStore<TState, TAction> {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  const { enhancer, preloadedState } = attach

  if (enhancer) {
    return enhancer(createStore)(reducer, { preloadedState })
  }

  let currentReducer = reducer
  let currentState = preloadedState
  let currentListeners: L<IListener> = []
  let nextListeners = currentListeners
  let isDispatching = false

  function ensureCanMutateNextListeners () {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  function getState () {
    if (isDispatching) throw new Error('You may not getState while the reducer is executing.')

    return currentState
  }

  /** @see https://redux.js.org/api-reference/store#subscribe(listener) for more details. */
  function subscribe (listener: IListener) {
    if (isDispatching) throw new Error('You may not subscribe while the reducer is executing.')

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe () {
      if (!isSubscribed) return

      if (isDispatching) throw new Error('You may not unsubscribe while the reducer is executing.')

      isSubscribed = false

      ensureCanMutateNextListeners()
      nextListeners.splice(nextListeners.indexOf(listener), 1)
    }
  }

  function dispatch<T extends TAction> (action: T): T {
    if (isDispatching) throw new Error('Reducers may not dispatch actions.')

    try {
      isDispatching = true
      currentState = currentReducer(currentState!, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < listeners.length; i++) {
      listeners[ i ]()
    }

    return action
  }

  function replaceReducer (nextReducer: F) {
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE } as TAction)
  }

  dispatch({ type: ActionTypes.INIT } as TAction)

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
  }
}
