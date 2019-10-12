import { h } from 'preact' // lgtm [js/unused-local-variable]

import { useRedux } from '../../redux'
import { bem } from '../../helpers'


export default function domino () {
  const { global } = useRedux()

  return (
    <div
      class={`fabric-wrapper absolute--full ${bem('domino-container', '', {ready: global.ready})}`}
    >
      <div class="fabric-container">
        <ul class="dominos" aria-busy="true" aria-label="Loading">
          <li class="domino" />
          <li class="domino" />
          <li class="domino" />
          <li class="domino" />
          <li class="domino" />
          <li class="domino" />
          <li class="domino" />
        </ul>
        <p class="domino-description">Everything will be okay in the end. If it's not okay, it's not the end. - John Lennon</p>
      </div>
    </div>
  )
}
