import { randomString } from '../../helpers/Adapter'


let defualtSlug = 0

/**
 * @description
 *   it make you able to reference it with action type in string but actually namespaced.
 * @example
 *   const actionTypes = ['INCREMENT', 'DECREMENT'] as const
 *   const ActionTypes = registerActions(actionTypes)
 */
export function registerActions <T extends ReadonlyArray<S>> (actionsTypes: T, slug?: S) {
  slug = slug !== undefined ? `@@${slug}` : `@@slug${defualtSlug++}/${randomString()}`
  const actions = {}

  for (let i = 0; i < actionsTypes.length; i++) {
    actions[actionsTypes[i]] = `${slug}/${i}`
  }

  return actions as {
    [K in C<T>]: K
  }
}
