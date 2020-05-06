import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { Dialog, Button } from 'src/components/sui'
import { Suite, lorem } from '../helpers'


export const DialogStory = () => {
  const [visible, setState] = useState(false)
  const showDialog = () => setState(true)
  const hideDialog = () => setState(false)
  return (
    <Suite caption="stardard">
      <Button label="Dialog" onClick={showDialog} />
      <Dialog
        visible={visible}
        title={lorem.title}
        onConfirm={hideDialog}
        onCancel={hideDialog}
      >
        <div style="max-width: 400px;">
          <p>{lorem.middle}</p>
        </div>
      </Dialog>
    </Suite>
  )
}
