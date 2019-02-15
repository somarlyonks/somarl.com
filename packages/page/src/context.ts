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
  richOutput: S
  setTerminalState: (state: GTermianlState) => void
  setRichOutput: (output: S) => void
}


const Context = React.createContext<IContext>({
  mainColor: 'lightcoral',
  terminalState: 'blur',
  richOutput: '',
  setTerminalState: (state: GTermianlState) => {},
  setRichOutput: (output: S) => {},
})


export default Context
