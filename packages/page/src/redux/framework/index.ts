export { IAction, IStore } from './shared'
export { IEnhancer } from './enhancer'

import { applyMiddleware } from './middleware'

import { createStore } from './store'

export default {
  createStore,
  applyMiddleware,
}
