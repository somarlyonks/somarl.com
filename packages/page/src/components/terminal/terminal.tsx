import { h, Component } from 'preact'

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
    readOnly={true}
  />
)

const setTerminalState = (payload: GTermianlState) => store.dispatch({
  type: ActionTypes.global.SET_TERMINALSTATE,
  payload,
})

export default class TerminalInput extends Component<ITerminalInputProps, ITerminalInputStates> {
  public readonly state: ITerminalInputStates = {
    text: '',
    supportDisplay: false,
    caretText: '█',
    fakeContrastText: '',
  }

  private readonly onFocus: h.JSX.FocusEventHandler = event => {
    if (this.props.onFocus) {
      this.props.onFocus()
    }

    this.setState({ supportDisplay: true })
    setTerminalState('focus')
  }


  private readonly onBlur: h.JSX.FocusEventHandler = event => {
    this.setState({ supportDisplay: false })
    setTerminalState('blur') // FIXME: @sy DEBUG
  }

  /** @setState */
  private readonly jumpTo = (event: Event) => {
    if (!event.target) return ''

    const target = event.target as HTMLInputElement
    const position = target.selectionStart
    const prefix = Array(position).fill(' ' as any).join('')
    const text = target.value
    const caretText = prefix + '█'
    const fakeContrastText = prefix + (text[position!] || ' ')
    const isFireOnChangeNeeded = this.props.onChange ? text !== this.state.text : true

    this.setState({ text, caretText, fakeContrastText })

    return isFireOnChangeNeeded ? text : false
  }

  private readonly onChange: h.JSX.GenericEventHandler = event => {
    const maybeDirtyText = this.jumpTo(event)

    if (maybeDirtyText !== false && this.props.onChange) {
      this.props.onChange(maybeDirtyText)
    }
  }

  private readonly onKeyUp: h.JSX.KeyboardEventHandler = event => {
    this.jumpTo(event)
    const target = event.target as HTMLInputElement

    if (event.key === 'Enter') {
      target.blur()
      setTerminalState('output')
      if (this.props.onEmit) {
        this.props.onEmit(target.value)
      }
    }
  }

  /**
   * Mannully set the initial state supportDisplay to true because of the autofocus
   * But it's not a good idea to call the callback
   */
  public componentDidMount () {
    // this.onFocus() // autoFocus
    // this.setState({supportDisplay: true})
  }

  public render () {
    const { global } = useRedux()

    return (
      <div className="terminal-input">
        <input
          type="text"
          style={{borderLeftColor: global.themeColor}}
          className="terminal-input__input"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onChange}
          onKeyUp={this.onKeyUp}
          onMouseUp={this.jumpTo}
        />
        <SupportInput
          className="terminal-input__support"
          supportText={this.state.caretText}
          display={this.state.supportDisplay}
        />
        <SupportInput
          className="terminal-input__support terminal-input__support_contrast"
          supportText={this.state.fakeContrastText}
          display={this.state.supportDisplay}
        />
      </div>
    )
  }
}
