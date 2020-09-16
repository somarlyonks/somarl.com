
import { h } from 'preact'
import { useEffect, useState, useRef } from 'preact/hooks'

import { actor, useRedux } from 'src/redux'
import { GTermianlState } from 'src/redux/store/global'
import { bem } from 'src/helpers'


interface IProps {
  readonly value?: S
  readonly onFocus?: () => void
  readonly onChange?: (value: IState['text']) => void
  readonly onEmit?: (value: IState['text']) => void
}

interface IState {
  text: S
  supportDisplay: boolean
  caretText: S
  fakeContrastText: S
}

interface ISupportInputProps {
  readonly class: S
  readonly supportText: S
  readonly display: boolean
}


const SupportInput = ({class: className, supportText, display}: ISupportInputProps) => (
  <input
    type="text"
    className={className}
    value={supportText}
    style={{display: display ? 'block' : 'none'}}
    readOnly
  />
)

const setTerminalState = (payload: GTermianlState) => actor({
  type: actor.types.global.SET_TERMINALSTATE,
  payload,
})


export default function TerminalInput (props: IProps) {
  const [state, setState] = useState<IState>({
    text: '',
    supportDisplay: false,
    caretText: '█',
    fakeContrastText: '',
  })
  const deriveState = (s: Partial<IState>) => setState(prev => ({...prev, ...s}))

  const $input = useRef<HTMLInputElement>()

  useEffect(() => {
    const { value } = props
    if (value !== undefined) {
      deriveState({text: value})
      if ($input.current) {
        $input.current.value = value
        absJumpTo($input.current)
      }
    }
  }, [props.value])

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

  const absJumpTo = (target: HTMLInputElement) => {
    const position = target.selectionStart || 0
    const prefix = Array<S>(position).fill(' ').join('')
    const text = target.value
    const caretText = prefix + '█'
    const fakeContrastText = prefix + (text[position!] || ' ')
    const isFireOnChangeNeeded = !!props.onChange && text !== state.text

    deriveState({ text, caretText, fakeContrastText })

    return isFireOnChangeNeeded ? text : false
  }

  const jumpTo = (event: h.JSX.TargetedEvent<HTMLInputElement>) => {
    if (!event.currentTarget) return ''

    return absJumpTo(event.currentTarget)
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
      if (props.onEmit) {
        props.onEmit(target.value.trim())
      }
    }
  }

  const { borderLeftColor, terminalState } = useRedux(s => ({
    borderLeftColor: s.global.themeColor,
    terminalState: s.global.terminalState,
  }))

  return (
    <div class={bem('terminal-input', '', [terminalState])}>
      <input
        ref={$input}
        type="text"
        style={{borderLeftColor}}
        class="terminal-input__input"
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        onKeyUp={onKeyUp}
        onMouseUp={jumpTo}
      />
      <SupportInput
        class="terminal-input__support"
        supportText={state.caretText}
        display={state.supportDisplay}
      />
      <SupportInput
        class="terminal-input__support terminal-input__support-contrast"
        supportText={state.fakeContrastText}
        display={state.supportDisplay}
      />
    </div>
  )
}
