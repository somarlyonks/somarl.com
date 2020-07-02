import { h } from 'preact' // lgtm [js/unused-local-variable]
import { Button, Fabric } from 'src/components/sui'
import RegisterForm from 'src/components/user/registerform'


export const FormStory = () => {

  const id = 'x'

  const onSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = event => {
    const target = event.currentTarget
    const formdata = new FormData(target)
    const data = Object.fromEntries(formdata.entries())
    console.info('submitted with data', data)
  }

  return (
    <div>
      <RegisterForm onSubmit={onSubmit} id={id} />
      <Fabric clearfix class="pd--10">
        <Button type="submit" form={id} label="submit" />
      </Fabric>
    </div>
  )
}
