import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import { Api, bem } from 'src/helpers'
import { Quote } from 'src/components/sui'


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
  const deriveState = (prcd: Partial<IFooterState>) => setState(prev => ({ ...prev, ...prcd }))

  useEffect(() => {
    Api.getBinks().then(resp => {
      if (Api.isResponseOK(resp)) {
        deriveState({
          binksName: resp.body.image,
          binksCopyright: resp.body.copyright,
        })
      }
      deriveState({ toggled: localStorage.getItem('footerToggled') === 'true' })
    })
  }, [])

  function toggle () {
    localStorage.setItem('footerToggled', `${!state.toggled}`)
    setState((prev: IFooterState) => ({ ...prev, toggled: !prev.toggled }))
  }

  const em = bem('footer')

  return (
    <footer class={em('', [state.toggled && 'toggled'])}>
      <div class="absolute footer__widget" onClick={toggle} />
      <span class={em('image-info', [state.binksCopyright ? 'adequate' : 'simple'])}>
        <Quote inline quote={state.binksName || 'Failed to load image'} author={state.binksCopyright} />
      </span>
      <span class="footer__copyright">© 2020 Sy. All rights reserved.</span>
    </footer>
  )
}
