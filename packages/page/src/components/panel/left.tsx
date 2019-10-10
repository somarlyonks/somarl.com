import { h, Component } from 'preact' // lgtm [js/unused-local-variable]
import { useCallback } from 'preact/hooks'

import store, { IImplState, useMappedState, ActionTypes } from '../../redux/store'

import Terminal from '../terminal/terminal'
import Sysh from '../../helpers/sysh'


interface IPanelLeftStates {
  inputText: string
  output: string
}


export default class PanelLeft extends Component<{}, IPanelLeftStates> {
  public readonly state: IPanelLeftStates = {
    inputText: '',
    output: 'Input things like: blogs --page=2',
  }

  private readonly handleInputChange = (input: string) => {
    this.setState({output: '...'})
    this.parseInput(input).then(
      output => this.setState({ output })
    )
  }

  private readonly handleInputted = (input: string) => {
    this.setState({output: 'processing...'})
    this.execCommand(input).then(
      output => this.setState({ output })
    )
  }

  private readonly parseInput = (input: string) => {
    return Sysh.parse(input)
  }

  private readonly execCommand = (input: string) => {
    return Sysh.exec(input)
  }

  public componentDidMount () {
    Sysh.register(output => store.dispatch({
      type: ActionTypes.global.SET_RICHOUTPUT,
      payload: output,
    }))
  }


  public render () {
    const { global } = useMappedState(useCallback((state: IImplState) => state, []))
    return (
      <section className={`col-md flex-verticle panel-left panel-left_${global.terminalState}`}>
        <div className="terminal-hang" />

        <Terminal
          onChange={this.handleInputChange}
          onEmit={this.handleInputted}
        />

        <aside className="flex-grow terminal-out">
          <div className="terminal-out__content no-scrollbar pre-wrap font-mono">{this.state.output}</div>
        </aside>
      </section>
    )
  }
}
