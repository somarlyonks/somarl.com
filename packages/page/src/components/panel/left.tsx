import { h, Component } from 'preact' // lgtm [js/unused-local-variable]

import store, { ActionTypes, useRedux } from '../../redux'

import Terminal from '../terminal/terminal'
import Sysh from '../../helpers/sysh'

import Avatar from '../sui/avatar'


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
    const { terminalState, user } = useRedux(state => ({
      terminalState: state.global.terminalState,
      user: state.user.user,
    }))
    return (
      <section className={`col-md flex-verticle panel-left panel-left_${terminalState}`}>
        <div className="terminal-hang" />

        <Terminal
          onChange={this.handleInputChange}
          onEmit={this.handleInputted}
        />

        <aside className="flex-grow terminal-out">
          <Avatar user={user} />
          <div className="terminal-out__content no-scrollbar pre-wrap font-mono">{this.state.output}</div>
        </aside>
      </section>
    )
  }
}
