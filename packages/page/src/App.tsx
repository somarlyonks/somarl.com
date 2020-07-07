import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'
import { Progress, Domino } from './components/sui'
import Api from './helpers/Api'
import store, { StoreContext, actor } from './redux'


export default function App () {
  const [ready, setter] = useState('')
  useEffect(() => {
    window.SS = { Api }

    const pColor = Api.getBinksColor()
    const setColor = async (color: R<typeof Api.getBinksColor>) => `rgb(${(await color).join(', ')})`

    actor({
      type: actor.types.global.SET_THEMECOLOR,
      payload: setColor(pColor),
    })

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
