
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useEffect } from 'preact/hooks'

import { actor, useRedux } from 'src/redux'
import Sysh from 'src/helpers/sysh'

import Terminal from '../terminal/terminal'
import { bem } from 'src/helpers'
import { useSearchParam } from 'src/router/hooks'
import { useLocation } from 'src/router'


function Output () {
  const cmd = useSearchParam('sh')
  const { output } = useRedux(s => ({
    output: s.global.terminalOutput,
  }))
  return (
    <aside class="flex-grow terminal-out">
      <div class="terminal-out__content no-scrollbar pre-wrap font-mono">
        <div>{cmd}</div>
        <div>{output}</div>
      </div>
    </aside>
  )
}


function T () {
  const [, navigate] = useLocation()
  const parseInput = (input: string) => Sysh.parse(input)
  const execCommand = (input: string) => Sysh.exec(input)
  const setTerminaloutput = (payload: S) => actor({
    type: actor.types.global.SET_TERMINALOUTPUT,
    payload,
  })

  const handleInputChange = (input: string) => {
    setTerminaloutput('...')
    parseInput(input).then(
      output => setTerminaloutput(output)
    )
  }

  const handleInputted = (input: string) => {
    setTerminaloutput('processing...')
    execCommand(input)
    navigate(`?sh=${input}`)
  }

  return (
    <Terminal
      onChange={handleInputChange}
      onEmit={handleInputted}
    />
  )
}


export default function PanelLeft () {
  useEffect(() => {
    Sysh.register(result => actor({
      type: actor.types.global.SET_RICHOUTPUT,
      payload: result,
    }))
  }, [])
  const { terminalState } = useRedux(s => ({
    terminalState: s.global.terminalState,
  }))

  return (
    <section class={`col-md flex-verticle ${bem('panel-left', [terminalState])}`}>
      <div class="terminal-hang" />
      <T />
      <Output />
    </section>
  )
}
