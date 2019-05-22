import { IReducer, IReducers, IAction } from './shared'


export function combineReducers <TState, TAction extends IAction> (reducers: IReducers<TState, TAction>): IReducer<TState, TAction> {
  const reducerKeys = Object.keys(reducers)

  return function combination (state: TState, action: TAction) {
    let hasChanged = false
    const nextState: TState = {} as any
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      const prevStateForKey = state[key]
      const nextStateForKey = reducer(prevStateForKey, action)
      nextState[key] = nextStateForKey
      if (!hasChanged) {
        hasChanged = nextStateForKey !== prevStateForKey
      }
    }
    return hasChanged ? nextState : state
  }
}
