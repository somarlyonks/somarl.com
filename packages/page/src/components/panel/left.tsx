import * as React from 'react'
import Terminal from '../terminal/terminal'
import Sysh from '../../helpers/sysh'
import Context from '../../context'


interface IPanelLeftStates {
  inputText: string
  output: string
}


export default class PanelLeft extends React.Component<{}, IPanelLeftStates> {
  public readonly state: IPanelLeftStates = {
    inputText: '',
    output: 'Input things like: blogs --page=2',
  }

  private readonly handleInputChange = (input: string) => {
    const output = this.parseInput(input)
    this.setState({ output })
  }

  private readonly handleInputted = (input: string) => {
    const output = this.execCommand(input)
    this.setState({ output })
  }

  private readonly parseInput = (input: string) => {
    return Sysh.parse(input)
  }

  private readonly execCommand = (input: string) => {
    return Sysh.exec(input)
  }


  public render () {
    return (
      <Context.Consumer>
        {({ terminalState }) => (
          <section className={`col-md flex-verticle panel-left panel-left_${terminalState}`}>
            <div className="terminal-hang" />

            <Terminal
              onChange={this.handleInputChange}
              onEmit={this.handleInputted}
            />

            <aside className="flex-grow terminal-out">
              <div className="terminal-out__content pre-wrap font-mono">{this.state.output}</div>
            </aside>
          </section>
        )}
      </Context.Consumer>
    )
  }
}
