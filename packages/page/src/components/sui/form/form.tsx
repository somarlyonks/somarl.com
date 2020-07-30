
import { h } from 'preact' // lgtm [js/unused-local-variable]

import { randomString } from 'src/helpers'
import { IFormProps } from './shared'


export default function Form ({
  id,
  action = 'javascript:void 0;',
  onSubmit,
  onInput,
  children,
  formData,
}: IFormProps) {
  id = id || `form-${randomString()}`

  return (
    <form id={id} action={action} onSubmit={onSubmit}>
      {children!.map(c => {
        c.props.onInput = onInput
        if (c.props.value === undefined && formData) {
          c.props.value = formData[c.props.name!]
        }
        return c
      })}
    </form>
  )
}
