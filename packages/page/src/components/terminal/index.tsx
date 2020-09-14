
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useEffect } from 'preact/hooks'

import { actor } from 'src/redux'
import Sysh from 'src/helpers/sysh'

import Terminal from '../terminal/core'
import { useLocation } from 'src/router'


export default function SyshTerminal () {
  const [, navigate] = useLocation()

  useEffect(() => {
    Sysh.register(result => actor({
      type: actor.types.global.SET_RICHOUTPUT,
      payload: result,
    }))
  }, [])

  const parseInput = (input: string) => Sysh.parse(input)
  const execCommand = (input: string) => Sysh.exec(input)
  const setTerminaloutput = (payload: S) => actor({
    type: actor.types.global.SET_TERMINALOUTPUT,
    payload,
  })

  const handleInputChange = (input: string) => {
    setTerminaloutput('...')
    parseInput(input).then(setTerminaloutput)
  }

  const handleInputted = (input: string) => {
    setTerminaloutput('processing...')
    execCommand(input).then(setTerminaloutput)
    navigate(`?sh=${input}`)
  }

  return (
    <Terminal
      onChange={handleInputChange}
      onEmit={handleInputted}
    />
  )
}
