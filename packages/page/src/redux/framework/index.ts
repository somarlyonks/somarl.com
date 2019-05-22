export { IStore, IReducer, IReducers, IAction, IMiddleware } from './shared'

import { createStore } from './store'
import { combineReducers } from './reducer'
import { bindActionCreators } from './action'
import { applyMiddleware } from './middleware'


export default {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
}
