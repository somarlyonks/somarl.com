
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { Suite } from '../helpers'
import { useSlide, Button } from 'src/components/sui'


export const SlideStory = () => {
  const [Slide, slideProps, slideGo] = useSlide()
  const [count, setState] = useState(1)
  const incr = () => {
    slideGo('left', () => setState(prev => prev + 1))
  }
  const decr = () => {
    slideGo('right', () => setState(prev => prev - 1))
  }

  return (
    <Suite caption="Counter">
      <div className="fabric-wrapper">
        <Button label="👈" onClick={decr} />
        <Slide {...slideProps} width="10rem">
          <p class="text--center">{count}</p>
        </Slide>
        <Button label="👉" onClick={incr} />
      </div>
    </Suite>
  )
}
