import * as React from 'react'


export type GTermianlState =
  // show terminal output when focus
  'focus' |
  // hide terminal output when blur
  'blur' |
  // show output article panel when output
  'output'

export interface IContext {
  terminalState: GTermianlState
  setTerminalState: (state: GTermianlState) => void
}


const Context = React.createContext<IContext>({
  terminalState: 'blur',
  setTerminalState: (state: GTermianlState) => {},
})


export default Context
