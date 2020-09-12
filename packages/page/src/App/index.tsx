import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import Footer from './footer'
import Header from './header'
import Main from './main'
import { Progress, Domino } from 'src/components/sui'
import Api from 'src/helpers/Api'
import store, { StoreContext, actor } from 'src/redux'


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

    Promise.all([pColor, Api.logged()])
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
