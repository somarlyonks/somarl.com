import store, { ActionTypes } from '../redux/store'
import redux, { IAction } from '../redux/framework'


it('inited the store properly', () => {
  expect(store.getState()!.global).toBe(0)
})

it('changeStates properly', () => {
  store.dispatch({
    type: ActionTypes.INCRMENT,
    payload: 1,
  })

  expect(store.getState()!.global).toBe(1)
})

//

interface IImplAction extends IAction {
  type: 'TEST' | 'CHANGE'
}

interface ITestState {
  status: 'success' | 'error',
  testCall: number
}

const testStore = redux.createStore<ITestState, IImplAction>((state, action) => {
  if (action.type === 'CHANGE') {
    if (state.status === 'success') return {...state, status: 'error'}
    return {...state, status: 'success'}
  }
  if (action.type === 'TEST') {
    return {...state, testCall: state.testCall + 1}
  }
  return state
}, {preloadedState: {status: 'success', testCall: 0}})

it('subscribe events properly', () => {
  expect(testStore.getState()!.status).toBe('success')
  expect(testStore.getState()!.testCall).toBe(0)
  let currentStatus = testStore.getState()!.status
  testStore.subscribe(() => {
    const state = testStore.getState()
    if (state && state.status !== currentStatus) {
      currentStatus = state.status
      testStore.dispatch({type: 'TEST'})
    }
  })
  testStore.dispatch({type: 'CHANGE'})
  expect(currentStatus).toBe('error')
  expect(testStore.getState()!.testCall).toBe(1)
})
