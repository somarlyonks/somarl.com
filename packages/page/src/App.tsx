import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import { Progress, Domino } from './components/sui'
import Api from './helpers/Api'
import store, { StoreContext, ActionTypes, actionProxy } from './redux'


export default function App () {
  const [ready, setter] = useState('')
  useEffect(() => {
    window.SS = { Api }

    const pColor = Api.getBinksColor()
    const setColor = actionProxy(
      ActionTypes.global.SET_THEMECOLOR,
      async (color: R<typeof Api.getBinksColor>) => `rgb(${(await color).join(', ')})`
    )

    store.dispatch(setColor(pColor))

    Promise.all([pColor])
      .then(() => setter('ready'))
      .catch(err => setter(err.message))
  }, [])

  return (
    <StoreContext.Provider value={store}>
      <Progress />
      <Header />
      <Main />
      <Footer />
      <Domino ready={ready} />
    </StoreContext.Provider>
  )
}
