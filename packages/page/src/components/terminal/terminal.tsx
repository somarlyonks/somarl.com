
import { h } from 'preact'
import { useState } from 'preact/hooks'

import store, { ActionTypes, useRedux } from '../../redux'
import { GTermianlState } from '../../redux/store/global'


export interface ITerminalInputProps {
  readonly onFocus?: () => void
  readonly onChange?: (value: ITerminalInputStates['text']) => void
  readonly onEmit?: (value: ITerminalInputStates['text']) => void
}

interface ITerminalInputStates {
  text: string
  supportDisplay: boolean
  caretText: string
  fakeContrastText: string
}

interface ISupportInputProps {
  readonly className: string
  readonly supportText: string
  readonly display: boolean
}


const SupportInput = ({className, supportText, display}: ISupportInputProps) => (
  <input
    type="text"
    className={className}
    value={supportText}
    style={{display: display ? 'block' : 'none'}}
    readOnly
  />
)

const setTerminalState = (payload: GTermianlState) => store.dispatch({
  type: ActionTypes.global.SET_TERMINALSTATE,
  payload,
})

export default function TerminalInput (props: ITerminalInputProps) {
  const [state, setState] = useState<ITerminalInputStates>({
    text: '',
    supportDisplay: false,
    caretText: '█',
    fakeContrastText: '',
  })
  const deriveState = (s: Partial<ITerminalInputStates>) => setState(prev => ({...prev, ...s}))

  const onFocus: h.JSX.FocusEventHandler<HTMLInputElement> = event => {
    if (props.onFocus) {
      props.onFocus()
    }

    deriveState({ supportDisplay: true })
    setTerminalState('focus')
  }


  const onBlur: h.JSX.FocusEventHandler<HTMLInputElement> = event => {
    deriveState({ supportDisplay: false })
    setTerminalState('blur')
  }

  const jumpTo = (event: h.JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.target) return ''

    const target = event.target as HTMLInputElement
    const position = target.selectionStart || 0
    const prefix = Array<S>(position).fill(' ').join('')
    const text = target.value
    const caretText = prefix + '█'
    const fakeContrastText = prefix + (text[position!] || ' ')
    const isFireOnChangeNeeded = props.onChange ? text !== state.text : true

    deriveState({ text, caretText, fakeContrastText })

    return isFireOnChangeNeeded ? text : false
  }

  const onChange: h.JSX.GenericEventHandler<HTMLInputElement> = event => {
    const maybeDirtyText = jumpTo(event)

    if (maybeDirtyText !== false && props.onChange) {
      props.onChange(maybeDirtyText)
    }
  }

  const onKeyUp: h.JSX.KeyboardEventHandler<HTMLInputElement> = event => {
    jumpTo(event)
    const target = event.target as HTMLInputElement

    if (event.key === 'Enter') {
      target.blur()
      setTerminalState('output')
      if (props.onEmit) {
        props.onEmit(target.value)
      }
    }
  }

  const { borderLeftColor } = useRedux(s => ({
    borderLeftColor: s.global.themeColor,
  }))

  return (
    <div className="terminal-input">
      <input
        type="text"
        style={{borderLeftColor}}
        className="terminal-input__input"
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        onKeyUp={onKeyUp}
        onMouseUp={jumpTo}
      />
      <SupportInput
        className="terminal-input__support"
        supportText={state.caretText}
        display={state.supportDisplay}
      />
      <SupportInput
        className="terminal-input__support terminal-input__support_contrast"
        supportText={state.fakeContrastText}
        display={state.supportDisplay}
      />
    </div>
  )
}
