import * as React from 'react'
import Terminal from './terminal/terminal'


export default function Main () {
  return (
    <main>
      main
      <Terminal onChange={console.info} />
    </main>
  )
}
