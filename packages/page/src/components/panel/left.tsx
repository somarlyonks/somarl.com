
import { h } from 'preact' // lgtm [js/unused-local-variable]


import { useRedux } from 'src/redux'

import { bem } from 'src/helpers'


function Output () {
  const { output } = useRedux(s => ({
    output: s.global.terminalOutput,
  }))
  return (
    <aside class="flex-grow terminal-out">
      <div class="terminal-out__content no-scrollbar pre-wrap font-mono">
        <div>{output}</div>
      </div>
    </aside>
  )
}


export default function PanelLeft () {
  const { terminalState } = useRedux(s => ({
    terminalState: s.global.terminalState,
  }))

  return (
    <section class={`col-md flex-verticle ${bem('panel-left', '', [terminalState])}`}>
      <div class="terminal-hang" />
      <Output />
    </section>
  )
}
