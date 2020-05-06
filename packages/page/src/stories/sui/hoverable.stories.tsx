import { h } from 'preact' // lgtm [js/unused-local-variable]

import { Hoverable, Button } from 'src/components/sui'
import { Suite, lorem } from '../helpers'


export const HoverableStory = () => {

  return (
    <div>
      <Suite caption="positions">
        <Hoverable position="top-left">
          <Button label="top" />
          <div>top</div>
        </Hoverable>
        <Hoverable position="top-right">
          <Button label="top-right" />
          <div>top-right</div>
        </Hoverable>
        <Hoverable position="right-top">
          <Button label="right" />
          <div>right</div>
        </Hoverable>
        <Hoverable position="right-bottom">
          <Button label="right-bottom" />
          <div>right-bottom</div>
        </Hoverable>
        <Hoverable position="bottom-left">
          <Button label="bottom" />
          <div>bottom</div>
        </Hoverable>
        <Hoverable position="bottom-right">
          <Button label="bottom-right" />
          <div>bottom-right</div>
        </Hoverable>
        <Hoverable position="left-top">
          <Button label="left" />
          <div>left</div>
        </Hoverable>
        <Hoverable position="left-bottom">
          <Button label="left-bottom" />
          <div>left-bottom</div>
        </Hoverable>
      </Suite>

      <Suite caption="top position not enough">
        <Hoverable>
          <Button label="Hover" />
          <div style="max-width: 400px;">
            <h2>{lorem.title}</h2>
            <p>{lorem.middle}</p>
          </div>
        </Hoverable>
      </Suite>

      <Suite caption="left position not enough">
        <Hoverable>
          <Button label="Hover" />
          <div style="max-width: 400px;">
            <h2>{lorem.title}</h2>
            <p>{lorem.middle}</p>
          </div>
        </Hoverable>
      </Suite>

      <Suite caption="right position not enough">
        <div style="flex: 2" />
        <Hoverable>
          <Button label="Hover" />
          <div style="width: 400px;">
            <h2>{lorem.title}</h2>
            <p>{lorem.middle}</p>
          </div>
        </Hoverable>
      </Suite>

      <Suite caption="auto-positioned-beak">
        <Hoverable>
          <Button label="Hover" />
          <div style="max-width: 400px;">
            <h2>Middle of target</h2>
            <p>If the content is wider than the target, beak will be positioned at the middle of the target.</p>
          </div>
        </Hoverable>
        <Hoverable>
          <Button label="Middle of content" />
          <div style="max-width: 400px; padding: 10px;">
            hover
          </div>
        </Hoverable>
      </Suite>
    </div>
  )
}
