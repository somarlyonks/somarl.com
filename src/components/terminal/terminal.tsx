import * as React from 'react'


export interface ITerminalInputProps {
  readonly onChange?: (value: ITerminalInputStates['text']) => void
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
    caretText: '',
    fakeContrastText: '',
  }

  private readonly onFocus = () => this.setState({ supportDisplay: true })

  private readonly onBlur = () => this.setState({ supportDisplay: false })

  private readonly jumpTo = (
    event: React.ChangeEvent<HTMLInputElement> |
           React.KeyboardEvent<HTMLInputElement> |
           React.MouseEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement
    const position = target!.selectionStart
    const prefix = Array(position).fill(' ' as any).join('')
    const text = target.value
    const caretText = prefix + '█'
    const fakeContrastText = prefix + (text[position!] || ' ')

    this.setState({ text, caretText, fakeContrastText })

    if (this.props.onChange) {
      this.props.onChange(text)
    }
  }

  public render () {
    return (
      <div className="terminal-input">
        <input
          type="text"
          className="terminal-input__input"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.jumpTo}
          onKeyUp={this.jumpTo}
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
