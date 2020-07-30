
import { h } from 'preact'

import { TextField, Form, IFormProps } from 'src/components/sui/form'
import { randomString } from 'src/helpers'


interface IFormData {
  email: S
  password: S
}

interface IProps extends IFormProps {
  formData?: IFormData
}


export default function LoginForm ({
  id,
  onSubmit: propOnSubmit,
  onInput: propOnInput,
  formData = {
    email: '',
    password: '',
  },
}: IProps) {
  id = id || `form-register-${randomString()}`

  const validatePassword = (s: S) => {
    const minLength = 4
    const maxLength = 16
    if (s.length < minLength) return `Supposed to be at least ${minLength} characters.`
    if (s.length > maxLength) return `Supposed to be at most ${maxLength} characters.`
    return ''
  }

  const onSubmit: h.JSX.GenericEventHandler<HTMLFormElement> = event => {
    const target = event.currentTarget
    if (propOnSubmit) propOnSubmit.bind(target)(event)
  }

  const onInput: h.JSX.GenericEventHandler<HTMLInputElement> = event => {
    const target = event.currentTarget
    if (propOnInput) propOnInput.bind(target)(event)
  }

  return (
    <Form id={id} formData={formData} onSubmit={onSubmit} onInput={onInput}>
      <TextField label="Email" name="email" type="email" maxLength={50} />
      <TextField label="Password" name="password" type="password" validate={validatePassword} />
    </Form>
  )
}
