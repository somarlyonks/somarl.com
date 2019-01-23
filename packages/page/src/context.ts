import * as React from 'react'


export type GTermianlState = 'focus' | 'blur' | 'output'

export interface IContext {
  terminalState: GTermianlState
  setTerminalState: (state: GTermianlState) => void
}


const Context = React.createContext<IContext>({
  terminalState: 'blur',
  setTerminalState: (state: GTermianlState) => {},
})


export default Context
