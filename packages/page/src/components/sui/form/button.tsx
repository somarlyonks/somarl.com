import { h } from 'preact'

import * as Icons from '../../icons'
import Fabric from '../fabric'
import { bem } from 'src/helpers'


interface IButtonProps {
  label: S
  loading?: boolean
  disabled?: boolean
  class?: S
  labelClassName?: S
  primary?: boolean
  borderless?: boolean
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>
  style?: S | {[key: string]: S | N}
}


export default function Button ({
  label,
  loading = false,
  disabled = false,
  class: className = '',
  labelClassName = '',
  onClick = () => {},
  style = '',
  primary = false,
  borderless = false,
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      class={`fabric-btn ${className} ` + bem('fabric-btn', '', [{primary, borderless}])}
      style={style}
      disabled={disabled || loading}
    >
      <Fabric clearfix>
        {loading
          ? <Icons.Loading style="transform: scale(0.75);" />
          : <span class={'fabric-btn__label ' + labelClassName}>{label}</span>
        }
      </Fabric>
    </button>
  )
}
