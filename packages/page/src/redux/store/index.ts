import redux, { IAction } from '../framework'


export enum ActionTypes {
  INCRMENT = 0,
  DECREMENT = 1,
}

interface IImplAction <T = A> extends IAction {
  type: ActionTypes
  payload: T
}

const store = redux.createStore<N, IImplAction<N>>((state, action) => {
  if (action.type === ActionTypes.INCRMENT) return state + action.payload
  if (action.type === ActionTypes.DECREMENT) return state - action.payload
  return state
}, { preloadedState: 0 })

export default store
