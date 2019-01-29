import * as React from 'react'


export type GTermianlState =
  // show terminal output when focus
  'focus' |
  // hide terminal output when blur
  'blur' |
  // show output article panel when output
  'output'

export interface IContext {
  mainColor: S
  terminalState: GTermianlState
  setTerminalState: (state: GTermianlState) => void
}


const Context = React.createContext<IContext>({
  mainColor: 'lightcoral',
  terminalState: 'blur',
  setTerminalState: (state: GTermianlState) => {},
})


export default Context
