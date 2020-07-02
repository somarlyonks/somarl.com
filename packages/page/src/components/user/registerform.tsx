
import { h } from 'preact'
import { useState } from 'preact/hooks'

import { TextField, Form } from 'src/components/sui/form'
import { randomString } from 'src/helpers'


interface IProps {
  id?: S
  onSubmit?: h.JSX.GenericEventHandler<HTMLFormElement>
}

interface IState {
  email: S
  password: S
}


export default function RegisterForm ({
  id,
  onSubmit: propOnSubmit,
}: IProps) {
  id = id || `form-register-${randomString()}`
  const [, setState] = useState<IState>({email: '', password: ''})

  const onInputEmail: h.JSX.GenericEventHandler<HTMLInputElement> =
    event => setState(prev => ({...prev, email: event.currentTarget.value}))
  const onInputPassword: h.JSX.GenericEventHandler<HTMLInputElement> =
    event => setState(prev => ({...prev, password: event.currentTarget.value}))

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

  return (
    <Form id={id} onSubmit={onSubmit}>
      <TextField name="email" type="email" onInput={onInputEmail} maxLength={50} />
      <TextField name="password" type="password" onInput={onInputPassword} validate={validatePassword} />
    </Form>
  )
}
