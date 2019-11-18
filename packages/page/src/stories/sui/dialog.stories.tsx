import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { Dialog, Button } from 'src/components/sui'
import { Suite } from '../helpers'


export const DialogStory = () => {
  const [visible, setState] = useState(false)
  const showDialog = () => setState(true)
  const hideDialog = () => setState(false)
  return (
    <Suite caption="top position not enough">
      <Button label="Dialog" onClick={showDialog} />
      <Dialog
        visible={visible}
        title="Lorem Ipsum"
        onConfirm={hideDialog}
        onCancel={hideDialog}
      >
        <div style="max-width: 400px;">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet erat porta, efficitur enim tincidunt, finibus mauris. Maecenas varius sollicitudin diam in accumsan. Ut ac lacus nec massa auctor eleifend. Integer fringilla ligula ac ligula elementum dictum. Suspendisse potenti. Sed ut dui in metus maximus ultrices. In id ante ut nunc commodo pulvinar. In nisi velit, viverra sed odio vitae, tincidunt vehicula sapien. Nunc at consectetur diam. Proin augue sapien, eleifend ut placerat vitae, porta at augue. Nulla ornare nisi eu nisi facilisis tempor. Aliquam erat volutpat. Donec eget arcu sit amet diam sollicitudin faucibus non nec purus. Suspendisse blandit massa ut erat porttitor, a euismod ex convallis. In porttitor urna turpis, quis lacinia diam iaculis ac.</p>
        </div>
      </Dialog>
    </Suite>
  )
}
