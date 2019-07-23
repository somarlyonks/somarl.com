import { h, Component } from 'preact'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import { getBinksColor } from './helpers/Api'

import store, { StoreContext, ActionTypes } from './redux/store'
import { action } from './redux/store/helpers'

import Consumer from './components/consumer'


class App extends Component {
  public async componentDidMount () {
    const setColor = action(
      ActionTypes.global.SET_THEMECOLOR,
      async (color: R<typeof getBinksColor>) => `rgb(${(await color).join(', ')})`
    )
    store.dispatch(setColor(getBinksColor()))
  }

  public render () {
    return (
      <StoreContext.Provider value={store}>
        <div style={{position: 'absolute', right: 0}}><Consumer /></div>
        <Header />
        <Main />
        <Footer />
      </StoreContext.Provider>
    )
  }
}


export default App
