import { h } from 'preact' // lgtm [js/unused-local-variable]

import { Hoverable, Button } from 'src/components/sui'
import { Suite } from '../helpers'


export const HoverableStory = () => {

  return (
    <div>
      <Suite caption="positions">
      <Hoverable position="top">
          <Button label="top" />
          <div>top</div>
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

      <Suite caption="top position not enough">
        <Hoverable>
          <Button label="Hover" />
          <div style="max-width: 400px;">
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet erat porta, efficitur enim tincidunt, finibus mauris. Maecenas varius sollicitudin diam in accumsan. Ut ac lacus nec massa auctor eleifend. Integer fringilla ligula ac ligula elementum dictum. Suspendisse potenti. Sed ut dui in metus maximus ultrices. In id ante ut nunc commodo pulvinar. In nisi velit, viverra sed odio vitae, tincidunt vehicula sapien. Nunc at consectetur diam. Proin augue sapien, eleifend ut placerat vitae, porta at augue. Nulla ornare nisi eu nisi facilisis tempor. Aliquam erat volutpat. Donec eget arcu sit amet diam sollicitudin faucibus non nec purus. Suspendisse blandit massa ut erat porttitor, a euismod ex convallis. In porttitor urna turpis, quis lacinia diam iaculis ac.</p>
          </div>
        </Hoverable>
      </Suite>

      <Suite caption="left position not enough">
        <Hoverable>
          <Button label="Hover" />
          <div style="max-width: 400px;">
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet erat porta, efficitur enim tincidunt, finibus mauris. Maecenas varius sollicitudin diam in accumsan. Ut ac lacus nec massa auctor eleifend. Integer fringilla ligula ac ligula elementum dictum. Suspendisse potenti. Sed ut dui in metus maximus ultrices. In id ante ut nunc commodo pulvinar. In nisi velit, viverra sed odio vitae, tincidunt vehicula sapien. Nunc at consectetur diam. Proin augue sapien, eleifend ut placerat vitae, porta at augue. Nulla ornare nisi eu nisi facilisis tempor. Aliquam erat volutpat. Donec eget arcu sit amet diam sollicitudin faucibus non nec purus. Suspendisse blandit massa ut erat porttitor, a euismod ex convallis. In porttitor urna turpis, quis lacinia diam iaculis ac.</p>
          </div>
        </Hoverable>
      </Suite>

      <Suite caption="right position not enough" fixme>
        <div style="flex: 2" />
        <Hoverable>
          <Button label="Hover" />
          <div style="width: 400px;">
            <h2>Lorem Ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet erat porta, efficitur enim tincidunt, finibus mauris. Maecenas varius sollicitudin diam in accumsan. Ut ac lacus nec massa auctor eleifend. Integer fringilla ligula ac ligula elementum dictum. Suspendisse potenti. Sed ut dui in metus maximus ultrices. In id ante ut nunc commodo pulvinar. In nisi velit, viverra sed odio vitae, tincidunt vehicula sapien. Nunc at consectetur diam. Proin augue sapien, eleifend ut placerat vitae, porta at augue. Nulla ornare nisi eu nisi facilisis tempor. Aliquam erat volutpat. Donec eget arcu sit amet diam sollicitudin faucibus non nec purus. Suspendisse blandit massa ut erat porttitor, a euismod ex convallis. In porttitor urna turpis, quis lacinia diam iaculis ac.</p>
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
