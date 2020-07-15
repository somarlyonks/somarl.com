import { h } from 'preact' // lgtm [js/unused-local-variable]

import { Dialog, Button } from 'src/components/sui'
import { Suite, lorem } from '../helpers'
import { useBoolState } from 'src/helpers'


export const DialogStory = () => {
  const [visible, showDialog, hideDialog] = useBoolState(false)

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
