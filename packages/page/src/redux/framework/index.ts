export {
  IStore,
  IListener,
  IDispatcher,
  IMiddleware,
  IReducer, IReducers,
  IAction, IActions, IBoundActions,
} from './shared'

import { createStore } from './store'
import { combineReducers } from './reducer'
import { bindActions } from './action'
import { applyMiddleware } from './middleware'


export default {
  createStore,
  combineReducers,
  bindActions,
  applyMiddleware,
}
