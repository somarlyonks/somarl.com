
import { h, ComponentChildren } from 'preact'

import { randomString } from 'src/helpers'


interface IProps {
  id?: S
  action?: S
  children: ComponentChildren
  onSubmit: h.JSX.GenericEventHandler<HTMLFormElement>
}


export default function Form ({
  id,
  action = 'javascript:void 0;',
  onSubmit,
  children,
}: IProps) {
  id = id || `form-${randomString()}`

  return (
    <form id={id} action={action} onSubmit={onSubmit}>{children}</form>
  )
}
