import { IAction } from '../framework'


/**
 * @description
 *   A proxy of action which partialize actions
 * @example
 *   const actionTypes = ['INCREMENT', 'DECREMENT'] as const
 *   const ActionTypes = registerActions(actionTypes)
 *   const API = async (x: N) => x + 1
 *   const incN = actionProxy(ActionTypes.global.INCREMENT, API)
 *   store.dispatch(incN(1))
 */
export function actionProxy <T extends S, TP, TPayload = A>
  (type: T, payloadFactory: F0<TPayload>): F0<IAction<T, Resolved<TPayload>>>
export function actionProxy <T extends S, TP, TPayload = A>
  (type: T, payloadFactory: F1<TP, TPayload>): F1<TP, IAction<T, Resolved<TPayload>>>
export function actionProxy <T extends S, TP, TP2, TPayload = A>
  (type: T, payloadFactory: F2<TP, TP2, TPayload>): F2<TP, TP2, IAction<T, Resolved<TPayload>>>
export function actionProxy <T extends S, TP, TP2, TP3, TPayload = A>
  (type: T, payloadFactory: F3<TP, TP2, TP3, TPayload>): F3<TP, TP2, TP3, IAction<T, Resolved<TPayload>>>
export function actionProxy <T extends S, TPayload = A>
  (type: T, payloadFactory: F<TPayload>): F<IAction<T, Resolved<TPayload>>> {
  const factory: F<TPayload | Error> = (first: A, ...args: L<A>) =>
    first instanceof Error ? first : payloadFactory(first, ...args)

  return (...args: L<A>) => {
    const payload = factory(...args) as A
    const _action: IAction<T, Resolved<TPayload>> = { type, payload }

    if (payload instanceof Error) {
      _action.errMsg = payload.message
    }
    return _action
  }
}
