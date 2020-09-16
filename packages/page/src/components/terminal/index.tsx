
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useEffect } from 'preact/hooks'

import { actor } from 'src/redux'
import Sysh from 'src/helpers/sysh'

import Terminal from '../terminal/core'
import { useLocation, useSearchParam } from 'src/router'


const setTerminaloutput = (payload: S) => actor({
  type: actor.types.global.SET_TERMINALOUTPUT,
  payload,
})

const execCommand = (input: S) => {
  actor({
    type: actor.types.global.SET_TERMINALSTATE,
    payload: 'output',
  })
  setTerminaloutput('processing...')
  Sysh.exec(input).then(setTerminaloutput)
}

export default function SyshTerminal () {
  const [, navigate] = useLocation()
  const cmd = useSearchParam('sh') || ''

  useEffect(() => {
    Sysh.register(result => actor({
      type: actor.types.global.SET_RICHOUTPUT,
      payload: result,
    }))
  }, [])

  useEffect(() => {
    if (cmd) execCommand(cmd)
  }, [cmd])

  const onChange = (input: S) => {
    setTerminaloutput('...')
    Sysh.parse(input).then(setTerminaloutput)
  }
  const onEmit = (input: S) => {
    navigate(`?sh=${input}`)
  }

  return (
    <Terminal
      value={cmd}
      onChange={onChange}
      onEmit={onEmit}
    />
  )
}
