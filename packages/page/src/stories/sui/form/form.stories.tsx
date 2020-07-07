
import { h } from 'preact' // lgtm [js/unused-local-variable]
import { useState } from 'preact/hooks'

import { Button, Fabric, Dialog, LoginForm } from 'src/components/sui'
import { randomString } from 'src/helpers'


export const FormStory = () => {

  const id = `story-form-${randomString()}`
  const id2 = `story-form-${randomString()}`

  const onSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = event => {
    const target = event.currentTarget
    const formdata = new FormData(target)
    const data = Object.fromEntries(formdata.entries())
    console.info('submitted with data', data)
  }
  const [visible, setState] = useState(false)
  const showDialog = () => setState(true)
  const hideDialog = () => setState(false)

  return (
    <div>
      <h2 class="story-suite__caption">Example Reigster form</h2>
      <LoginForm onSubmit={onSubmit} id={id} />
      <Fabric clearfix class="pd--10">
        <Button type="submit" form={id} label="submit" />
      </Fabric>

      <h2 class="story-suite__caption">In dialog</h2>
      <Button label="Dialog" onClick={showDialog} />
      <Dialog
        visible={visible}
        title="Register"
        onCancel={hideDialog}
        form={id2}
      >
        <LoginForm onSubmit={onSubmit} id={id2} />
      </Dialog>
    </div>
  )
}
