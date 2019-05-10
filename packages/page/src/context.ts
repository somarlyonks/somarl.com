import {Context, createContext} from 'preact-context'


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


const context: Context<IContext> = createContext<IContext>({
  mainColor: 'lightcoral',
  terminalState: 'blur',
  richOutput: '',
  setTerminalState: (state: GTermianlState) => {},
  setRichOutput: (output: S) => {},
})


export default context
