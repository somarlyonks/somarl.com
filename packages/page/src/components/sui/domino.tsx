import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState, useEffect } from 'preact/hooks'

import { useBem } from 'src/helpers'
import Fabric from './fabric'
import Quote from './quote'


interface IDominoProps {
  ready: S
}


export default function domino ({ ready }: IDominoProps) {
  const [loadingTooSlow, setter] = useState(false)
  const TIME_THRESHOLD = 3500
  useEffect(() => {
    const timer = setTimeout(() => setter(true), TIME_THRESHOLD)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Fabric class={'absolute--full ' + useBem('domino-container', '', {ready})}>
      <ul class="dominos" aria-busy="true" aria-label="Loading">
        <li class="domino" />
        <li class="domino" />
        <li class="domino" />
        <li class="domino" />
        <li class="domino" />
        <li class="domino" />
        <li class="domino" />
      </ul>
      <p class="domino-description">
        {
          loadingTooSlow
            ? <Quote inline quote="This is not the end. It is not even the beginning of the end. But it is, perhaps, the end of the beginning." author="Churchill" />
            : <Quote inline quote="Everything will be okay in the end. If it's not okay, it's not the end." author="John Lennon" />
        }
      </p>
    </Fabric>
  )
}
