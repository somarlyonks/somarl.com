
import { useCallback } from 'preact/hooks'
import store, { IImplState, IImplActions, useMappedState, ActionTypes, IImplAction } from './store'


export function useRedux <T extends F1<IImplState>> (
  stateMapper: T,
  inputs: ReadonlyArray<unknown> = []
) {
  return useMappedState(useCallback(stateMapper, inputs)) as R<T>
}


export const actors = Object.fromEntries(Object.entries(ActionTypes).map(
  ([k, actions]) => [k, Object.fromEntries(Object.entries(actions).map((
    ([k2, type]) => [k2, (payload: A) => store.dispatch({type, payload}) as A])
  ))])
) as {
  [K in keyof typeof ActionTypes]: {
    [K2 in keyof typeof ActionTypes[K]]: F1<IImplActions[K]['payload'] | P<IImplActions[K]['payload']>>
  }
}


interface IActor {
  (action: IImplAction): IImplAction
  types: typeof ActionTypes
}


class Actor extends Function {

  private _bound: A

  public constructor (_store: A, _ActionTypes: A) {
    super('action', 'return this._bound.dispatch(action)')
    this._bound = this.bind(this)
    this._bound.types = _ActionTypes
    this._bound.dispatch = (action: A) => _store.dispatch(action)
    return this._bound
  }

}

export const actor = new Actor(store, ActionTypes) as unknown as IActor
