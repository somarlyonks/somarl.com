import * as React from 'react'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import Context, { IContext, GTermianlState } from './context'
import { getBinksColor } from './helpers/Api'


class App extends React.Component<{}, IContext> {
  public state: IContext = {
    mainColor: 'lightcoral',
    terminalState: 'blur',
    setTerminalState: this.setTerminalState.bind(this),
  }

  public setTerminalState (state: GTermianlState) {
    this.setState({ terminalState: state })
  }

  public async componentDidMount () {
    const color = await getBinksColor()
    this.setState({ mainColor: `rgb(${color.join(', ')})`})
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
