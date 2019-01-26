import * as React from 'react'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import Context, { IContext, GTermianlState } from './context'


class App extends React.Component<{}, IContext> {
  public state: IContext = {
    terminalState: 'blur',
    setTerminalState: this.setTerminalState.bind(this),
  }

  public setTerminalState (state: GTermianlState) {
    this.setState({ terminalState: state })
  }

  public render () {
    return (
      <Context.Provider value={this.state}>
        <Header />
        <Main />
        <Footer />
      </Context.Provider>
    )
  }
}


export default App
