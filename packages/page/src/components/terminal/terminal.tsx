import * as React from 'react'
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


const SupportInput: React.SFC<ISupportInputProps> = ({className, supportText, display}) => (
  <input
    type="text"
    className={className}
    value={supportText}
    style={{display: display ? 'block' : 'none'}}
    readOnly={true}
  />
)

export default class TerminalInput extends React.Component<ITerminalInputProps, ITerminalInputStates> {
  public readonly state: ITerminalInputStates = {
    text: '',
    supportDisplay: false,
    caretText: '█',
    fakeContrastText: '',
  }

  private readonly onFocus = (contextSetter: IContext['setTerminalState']) => (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus()
    }

    this.setState({ supportDisplay: true })
    contextSetter('focus')
  }


  private readonly onBlur = (contextSetter: IContext['setTerminalState']) => (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ supportDisplay: false })
    contextSetter('blur')
  }

  /** @setState */
  private readonly jumpTo = (
    event: React.ChangeEvent<HTMLInputElement> |
           React.KeyboardEvent<HTMLInputElement> |
           React.MouseEvent<HTMLInputElement>
  ) => {
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

  private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maybeDirtyText = this.jumpTo(event)

    if (maybeDirtyText !== false && this.props.onChange) {
      this.props.onChange(maybeDirtyText)
    }
  }

  // TODO: shortcut key bindings
  private readonly onKeyUp = (contextSetter: IContext['setTerminalState']) => (event: React.KeyboardEvent<HTMLInputElement>) => {
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
              onChange={this.onChange}
              onKeyUp={this.onKeyUp(setTerminalState)}
              onMouseUp={this.jumpTo}
              // autoFocus={true}
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
