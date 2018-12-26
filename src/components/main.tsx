import * as React from 'react'
import Terminal from './terminal/terminal'


const partialLog = (prefix: string) => (v: string) => console.info(prefix, v)

export default function Main () {
  return (
    <main>
      main
      <Terminal onChange={partialLog('change')} onEmit={partialLog('emit')} />
    </main>
  )
}
