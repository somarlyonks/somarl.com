import { h, Component } from 'preact' // lgtm [js/unused-local-variable]

import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import Api from './helpers/Api'
import store, { StoreContext, ActionTypes, actionProxy } from './redux'

import Progress from './components/sui/progress'


class App extends Component {
  public async componentDidMount () {
    window.SS = { Api }
    const setColor = actionProxy(
      ActionTypes.global.SET_THEMECOLOR,
      async (color: R<typeof Api.getBinksColor>) => `rgb(${(await color).join(', ')})`
    )
    store.dispatch(setColor(Api.getBinksColor()))
  }

  public render () {
    return (
      <StoreContext.Provider value={store}>
        <Progress />
        <Header />
        <Main />
        <Footer />
      </StoreContext.Provider>
    )
  }
}


export default App
