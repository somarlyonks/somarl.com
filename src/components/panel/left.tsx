import * as React from 'react'
import Terminal from '../terminal/terminal'


interface IPanelLeftStates {
  inputted: boolean
}


const partialLog = (prefix: string) => (v: string) => console.info(prefix, v)

export default class PanelLeft extends React.Component<{}, IPanelLeftStates> {
  public readonly state: IPanelLeftStates = {
    inputted: false,
  }

  private readonly handleInputting = () => {
    this.setState({ inputted: false })
  }

  private readonly handleInputted = (v: string) => {
    partialLog('emit')(v)
    this.setState({ inputted: true })
  }

  public render () {
    return (
      <div className="col-md">
        <div
          className="terminal-hang"
          style={{display: this.state.inputted ? 'none' : 'block'}}
        />
        <Terminal
          onFocus={this.handleInputting}
          onChange={partialLog('change')}
          onEmit={this.handleInputted}
        />
        <div className="terminal-out" />
      </div>
    )
  }
}
