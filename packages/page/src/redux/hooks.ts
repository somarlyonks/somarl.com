import { useCallback } from 'preact/hooks'
import { IImplState, useMappedState } from './store'


export const useRedux = () => useMappedState(useCallback((state: IImplState) => state, []))
