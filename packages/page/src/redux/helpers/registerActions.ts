import { randomString } from '../../helpers/Adapter'


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
    const actionType = actionsTypes[i]
    actions[actionType] = `${namespace}/${i}:${actionType}`
  }

  return actions as {
    [K in C<T>]: K
  }
}
