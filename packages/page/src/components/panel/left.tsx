
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import store, { ActionTypes, useRedux } from 'src/redux'
import Sysh from 'src/helpers/sysh'

import Terminal from '../terminal/terminal'
import { bem } from 'src/helpers'


interface IPanelLeftStates {
  inputText: string
  output: string
}


export default function PanelLeft () {
  const [state, setState] = useState<IPanelLeftStates>({
    inputText: '',
    output: 'Input things like: blogs --page=2',
  })
  const deriveState = (s: Partial<IPanelLeftStates>) => setState(prev => ({...prev, ...s}))
  useEffect(() => {
    Sysh.register(output => store.dispatch({
      type: ActionTypes.global.SET_RICHOUTPUT,
      payload: output,
    }))
  }, [])
  const { terminalState } = useRedux(s => ({
    terminalState: s.global.terminalState,
  }))

  const handleInputChange = (input: string) => {
    deriveState({output: '...'})
    parseInput(input).then(
      output => deriveState({ output })
    )
  }

  const handleInputted = (input: string) => {
    deriveState({output: 'processing...'})
    execCommand(input).then(
      output => deriveState({ output })
    )
  }

  const parseInput = (input: string) => {
    return Sysh.parse(input)
  }

  const execCommand = (input: string) => {
    return Sysh.exec(input)
  }

  return (
    <section className={`col-md flex-verticle ${bem('panel-left', [terminalState])}`}>
      <div className="terminal-hang" />

      <Terminal
        onChange={handleInputChange}
        onEmit={handleInputted}
      />

      <aside className="flex-grow terminal-out">
        <div className="terminal-out__content no-scrollbar pre-wrap font-mono">{state.output}</div>
      </aside>
    </section>
  )
}
