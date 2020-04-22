import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import Api from '../helpers/Api'


export interface IFooterState {
  toggled: boolean
  binksName: S
  binksCopyright: S
}

export default function Footer () {
  const [state, setState] = useState<IFooterState>({
    toggled: true,
    binksName: '',
    binksCopyright: '',
  })
  const deriveState = (prcd: Partial<IFooterState>) => setState(prev => ({...prev, ...prcd}))

  useEffect(() => {
    Api.getBinks().then(resp => {
      if (Api.isResponseOK(resp)) {
        deriveState({
          binksName: resp.body.image,
          binksCopyright: resp.body.copyright,
        })
      }
      deriveState({toggled: localStorage.getItem('footerToggled') === 'true'})
    })
  }, [])

  function toggle () {
    localStorage.setItem('footerToggled', `${!state.toggled}`)
    setState((prev: IFooterState) => ({...prev, toggled: !prev.toggled}))
  }

  return (
    <footer className={`footer_toggle${state.toggled ? 'd' : ''}`}>
      <div className="absolute footer__widget" onClick={toggle} />
      <span className={`footer__image-info footer__image-info_${state.binksCopyright ? 'adequate' : 'simple'}`}>
        <span className="footer__image-info-name">"{state.binksName || 'Failed to load image'}"</span>
        <span className="footer__image-info-connect">&nbsp;-&nbsp;</span>
        <span className="footer__image-info-copyright">{state.binksCopyright}</span>
      </span>
      <span className="footer__copyright">© 2020 Sy. All rights reserved.</span>
    </footer>
  )
}
