
import { h, VNode } from 'preact'


export interface IFieldProps {
  name?: S
  label?: S
  value?: S
  onInput?: h.JSX.GenericEventHandler<HTMLInputElement>
}

export interface IFormProps {
  id?: S
  action?: S
  children?: L<VNode<IFieldProps>>
  onSubmit?: h.JSX.GenericEventHandler<HTMLFormElement>
  onInput?: h.JSX.GenericEventHandler<HTMLInputElement>
  formData?: O
}
