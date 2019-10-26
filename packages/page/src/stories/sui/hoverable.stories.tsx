import { h } from 'preact' // lgtm [js/unused-local-variable]

import { Hoverable, Button } from 'src/components/sui'
import { Suite } from '../helpers'


export const HoverableStory = () => {

  return (
    <div>
      <Suite caption="positions">
        <Hoverable>
          <Button label="top" />
          <div>Top for default</div>
        </Hoverable>
        <Hoverable position="right">
          <Button label="right" />
          <div>right</div>
        </Hoverable>
        <Hoverable position="bottom">
          <Button label="bottom" />
          <div>bottom</div>
        </Hoverable>
        <Hoverable position="left">
          <Button label="left" />
          <div>left</div>
        </Hoverable>
      </Suite>
    </div>
  )
}
