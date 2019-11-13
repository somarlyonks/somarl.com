import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { Domino, Button, Fabric } from 'src/components/sui'


export const DominoStory = () => {
  const [ready, setState] = useState('')
  const loaded = () => {
    setState('ready')
  }

  return (
    <div >
      <div class="absolute" style="z-index: 10000; top: 20px; left: 20px;">
        <Button label={ready || 'Click me to complete loading.'} onClick={loaded} />
      </div>
      <Domino ready={ready} />
      <Fabric class="absolute--full">
        <cite>Hope your road is a long one, full of adventure, full of discovery. - C.P.Cavafy</cite>
      </Fabric>
    </div>
  )
}
