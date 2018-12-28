import * as React from 'react'
import Terminal from '../terminal/terminal'
import Sysh from '../../helpers/sysh'


interface IPanelLeftStates {
  inputted: boolean
  inputText: string
  output: string
}


const partialLog = (prefix: string) => (v: string) => console.info(prefix, v)

export default class PanelLeft extends React.Component<{}, IPanelLeftStates> {
  public readonly state: IPanelLeftStates = {
    inputted: false,
    inputText: '',
    output: 'Input things like: blogs --page=2',
  }

  private readonly handleInputting = () => {
    console.info('eqwewqeqw') // TODELETE
    this.setState({ inputted: false })
  }

  private readonly handleInputChange = (input: string) => {
    const output = this.parseInput(input)
    this.setState({ output })
  }

  private readonly handleInputted = (input: string) => {
    this.setState({ inputted: true })
    const output = this.execCommand(input)
    this.setState({ output })
  }

  private readonly parseInput = (input: string) => {
    partialLog('change')(input)
    return Sysh.parse(input)
  }

  private readonly execCommand = (input: string) => {
    partialLog('emit')(input)
    return Sysh.exec(input)
  }


  public render () {
    return (
      <section className="col-md flex-verticle panel-left">
        <div className={'terminal-hang' + (this.state.inputted ? ' terminal-hang_hidden' : '')}/>

        <Terminal
          onFocus={this.handleInputting}
          onChange={this.handleInputChange}
          onEmit={this.handleInputted}
        />

        <aside className={'flex-grow terminal-out ' + (this.state.inputted ? '' : 'terminal-hint')}>
          <span>{this.state.output}</span>
        </aside>
      </section>
    )
  }
}
