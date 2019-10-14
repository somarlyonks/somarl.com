import { useCallback } from 'preact/hooks'
import { IImplState, useMappedState } from './store'


export function useRedux <T extends F1<IImplState>> (
  stateMapper: T,
  inputs: ReadonlyArray<unknown> = []
) {
  return useMappedState(useCallback(stateMapper, inputs)) as ReturnType<T>
}
