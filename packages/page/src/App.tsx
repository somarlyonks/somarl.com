import * as React from 'react'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
// import Context, { IContext } from './context'


class App extends React.Component<{}> {
  public state = {
  }

  public render () {
    return (
      <>
      <Header />
      <Main />
      <Footer />
      </>
    )
  }
}


export default App
