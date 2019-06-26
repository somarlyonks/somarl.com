import { h, Component, JSX } from 'preact'
import Context, { IContext } from '../../context'


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

export default class TerminalInput extends Component<ITerminalInputProps, ITerminalInputStates> {
  public readonly state: ITerminalInputStates = {
    text: '',
    supportDisplay: false,
    caretText: '█',
    fakeContrastText: '',
  }

  private readonly onFocus: (c: IContext['setTerminalState']) => JSX.FocusEventHandler = contextSetter => event => {
    if (this.props.onFocus) {
      this.props.onFocus()
    }

    this.setState({ supportDisplay: true })
    contextSetter('focus')
  }


  private readonly onBlur: (c: IContext['setTerminalState']) => JSX.FocusEventHandler = contextSetter => event => {
    this.setState({ supportDisplay: false })
    contextSetter('blur')
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

  private readonly onChange: JSX.EventHandler<Event> = event => {
    const maybeDirtyText = this.jumpTo(event)

    if (maybeDirtyText !== false && this.props.onChange) {
      this.props.onChange(maybeDirtyText)
    }
  }

  private readonly onKeyUp: (c: IContext['setTerminalState']) => JSX.KeyboardEventHandler = contextSetter => event => {
    this.jumpTo(event)
    const target = event.target as HTMLInputElement

    if (event.key === 'Enter') {
      target.blur()
      contextSetter('output')
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
    return (
      <Context.Consumer>
        {({setTerminalState, mainColor}) => (
          <div className="terminal-input">
            <input
              type="text"
              style={{borderLeftColor: mainColor}}
              className="terminal-input__input"
              onFocus={this.onFocus(setTerminalState)}
              onBlur={this.onBlur(setTerminalState)}
              onInput={this.onChange}
              onKeyUp={this.onKeyUp(setTerminalState)}
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
        )}
      </Context.Consumer>
    )
  }
}
