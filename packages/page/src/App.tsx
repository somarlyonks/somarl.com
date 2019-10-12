import { h } from 'preact' // lgtm [js/unused-local-variable]

import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import { Progress, Domino } from './components/sui'
import Api from './helpers/Api'
import store, { StoreContext, ActionTypes, actionProxy } from './redux'


window.SS = { Api }

const pColor = Api.getBinksColor()
const setColor = actionProxy(
  ActionTypes.global.SET_THEMECOLOR,
  async (color: R<typeof Api.getBinksColor>) => `rgb(${(await color).join(', ')})`
)
const initState = actionProxy(
  ActionTypes.global.READY,
  async (...promises: L<P>) => {
    try {
      await Promise.all(promises)
      return 'ready'
    } catch (error) {
      return error.message
    }
  }
)
store.dispatch(setColor(pColor))
store.dispatch(initState(pColor))


export default function App () {
  return (
    <StoreContext.Provider value={store}>
      <Progress />
      <Header />
      <Main />
      <Footer />
      <Domino />
    </StoreContext.Provider>
  )
}
