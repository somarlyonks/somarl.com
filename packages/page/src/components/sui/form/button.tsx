import { h } from 'preact'

import * as Icons from '../../icons'
import Fabric from '../fabric'
import { bem } from 'src/helpers'


interface IButtonProps {
  type?: 'button' | 'submit' | 'reset'
  name?: S
  label?: S
  icon?: h.JSX.Element
  loading?: boolean
  disabled?: boolean
  class?: S
  labelClassName?: S
  primary?: boolean
  borderless?: boolean
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>
  style?: S | {[key: string]: S | N}
  form?: S
}


export default function Button ({
  type = 'button',
  name,
  label,
  icon,
  loading = false,
  disabled = false,
  class: className = '',
  labelClassName = '',
  onClick,
  style = '',
  primary = false,
  borderless = false,
  form,
}: IButtonProps) {
  return (
    <button
      type={type}
      name={name}
      class={`fabric-btn ${className} ` + bem('fabric-btn', [{primary, borderless, icon}])}
      style={style}
      disabled={disabled || loading}
      form={form}
      onClick={onClick}
    >
      <Fabric clearfix>
        { loading ?
            <Icons.Loading style="transform: scale(0.75);" />
          : icon ?
            icon
          : <span class={'fabric-btn__label ' + labelClassName}>{label}</span>
        }
      </Fabric>
    </button>
  )
}
