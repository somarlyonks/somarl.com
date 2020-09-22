import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import { Api, useBem } from 'src/helpers'
import { Quote } from 'src/components/sui'


export interface IFooterState {
  binksName: S
  binksCopyright: S
}

export default function Footer () {
  const [toggled, setToggled] = useState(true)
  const [state, setState] = useState<IFooterState>({
    binksName: '',
    binksCopyright: '',
  })
  const deriveState = (prcd: Partial<IFooterState>) => setState(prev => ({ ...prev, ...prcd }))

  useEffect(() => {
    Api.getBinks().then(resp => {
      if (Api.isResponseOK(resp)) {
        deriveState({
          binksName: resp.body.image,
          binksCopyright: resp.body.copyright,
        })
      }
      setToggled(localStorage.getItem('footerToggled') === 'true')
    })
  }, [])

  function toggle () {
    localStorage.setItem('footerToggled', `${!toggled}`)
    setToggled(prev => !prev)
  }

  return (
    <footer class={useBem('footer', '', {toggled})}>
      <div class="absolute footer__widget" onClick={toggle} />
      <span class={useBem('footer', 'image-info', {simple: state.binksCopyright})}>
        <Quote inline quote={state.binksName || 'Failed to load image'} author={state.binksCopyright} />
      </span>
      <span class="footer__copyright">© 2020 Sy. All rights reserved.</span>
    </footer>
  )
}
