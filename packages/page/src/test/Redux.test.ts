import store, { ActionTypes, actions } from '../redux/store'
import redux, { IAction } from '../redux/lib'


it('inited the store properly', () => {
  expect(store.getState()!.global.testCount).toBe(0)
})

it('changeStates properly', () => {
  store.dispatch({
    type: ActionTypes.global.INCREMENT,
    payload: 1,
  })

  expect(store.getState()!.global.testCount).toBe(1)
})

it('dispatch bound actions porperly', () => {
  const stateBefore = store.getState()!
  expect(stateBefore.local).toBe(0)
  expect(stateBefore.global.testCount).toBe(1)
  store.dispatch(actions.local.INCREMENT(1))
  const stateAfter = store.getState()!
  expect(stateAfter.local).toBe(1)
  expect(stateAfter.global.testCount).toBe(1)
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
      testStore.dispatch({type: 'TEST', payload: undefined})
    }
  })
  testStore.dispatch({type: 'CHANGE', payload: undefined})
  expect(currentStatus).toBe('error')
  expect(testStore.getState()!.testCall).toBe(1)
})
