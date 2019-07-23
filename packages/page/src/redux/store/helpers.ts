import { randomString } from '../../helpers/Adapter'
import { IAction } from '../framework'


let defualtSlug = 0

/**
 * @description
 *   it's deceiving the tsc to make it believe the action types are literal
 *   Please avoid using same name as action type across namespaces, though it's able
 *   to infer the type of the payload, it's not concrete, which means unsafe.
 * @example
 *   const actionTypes = ['INCREMENT', 'DECREMENT'] as const
 *   const ActionTypes = registerActions(actionTypes)
 */
export function registerActions <T extends ReadonlyArray<S>> (actionsTypes: T, namespace?: S) {
  namespace = namespace !== undefined ? `@@${namespace}` : `@@slug${defualtSlug++}/${randomString()}`
  const actions = {}

  for (let i = 0; i < actionsTypes.length; i++) {
    actions[actionsTypes[i]] = `${namespace}/${i}`
  }

  return actions as {
    [K in C<T>]: K
  }
}


/**
 * @description
 *   it's deceiving the tsc to make it believe the payload are resolved
 * @example
 *   const actionTypes = ['INCREMENT', 'DECREMENT'] as const
 *   const ActionTypes = registerActions(actionTypes)
 */
export function action <T extends S, TP, TPayload = A>
  (type: T, payloadFactory: F0<TPayload>): F0<IAction<T, Resolved<TPayload>>>
export function action <T extends S, TP, TPayload = A>
  (type: T, payloadFactory: F1<TP, TPayload>): F1<TP, IAction<T, Resolved<TPayload>>>
export function action <T extends S, TP, TP2, TPayload = A>
  (type: T, payloadFactory: F2<TP, TP2, TPayload>): F2<TP, TP2, IAction<T, Resolved<TPayload>>>
export function action <T extends S, TP, TP2, TP3, TPayload = A>
  (type: T, payloadFactory: F3<TP, TP2, TP3, TPayload>): F3<TP, TP2, TP3, IAction<T, Resolved<TPayload>>>
export function action <T extends S, TPayload = A>
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

// TODO:  setter helper
