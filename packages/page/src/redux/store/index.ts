import redux, { IAction, IReducers } from '../framework'


export enum ActionTypes {
  INCRMENT  = 0,
  DECREMENT = 1,
}

interface IImplAction <T = A> extends IAction {
  type: ActionTypes
  payload: T
}

export interface IImplState {
  global: N
}

const preloadedState: IImplState = {
  global: 0,
}

const reducers: IReducers<IImplState, IImplAction> = {
  global (state, action) {
    if (action.type === ActionTypes.INCRMENT) return state + action.payload
    if (action.type === ActionTypes.DECREMENT) return state - action.payload
    return state
  },
}

const store = redux.createStore<IImplState, IImplAction>(
  redux.combineReducers(reducers),
  { preloadedState }
)

export default store
