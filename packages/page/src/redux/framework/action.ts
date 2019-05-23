import { IAction, IActions, IActionsFactory, IBoundActions } from './shared'
import { randomString } from '../../helpers/Adapter'

// inner actions
export const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`,
}

function clusterActions <TAction extends IAction> (actionCluster: {
  [K in TAction['type']]: K
}) {
  const actions = {} as IActionsFactory<TAction>
  for (const key in actionCluster) {
    actions[key] = (payload?: A) => ({ type: actionCluster[key], payload })
  }

  return actions
}

export function bindActions <TState, TActions extends IActions<TState>> (
  actionClusters: {
    [K in keyof TState]: {
      // @ts-ignore NOTE: Unable to judge K in IActions
      [K2 in TActions[K]['type']]: K2
    }
  }
): IBoundActions<TState, TActions> {
  const boundActions = {} as IBoundActions<TState, TActions>
  for (const clusterKey in actionClusters) {
    const actionCluster = actionClusters[clusterKey]
    boundActions[clusterKey] = clusterActions(actionCluster)
  }
  return boundActions
}
