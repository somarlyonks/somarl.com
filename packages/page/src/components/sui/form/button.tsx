import { h } from 'preact'

import * as Icons from '../../icons'
import Fabric from '../fabric'


interface IButtonProps {
  label: S
  loading?: boolean
  disabled?: boolean
  classNames?: L<S>
  labelClassName?: S
  onClick?: h.JSX.MouseEventHandler<HTMLButtonElement>
  style?: S | {[key: string]: S | N}
}

/**
 * @description magic words: 'primary', 'borderless'
 * @example
 *   <Button label="primary" classNames={['primary', 'borderless']} />
 */
export default function Button ({
  label,
  loading = false,
  disabled = false,
  classNames = [],
  labelClassName = '',
  onClick = () => {},
  style = '',
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={'fabric-btn ' + classNames.map(s => `${s} fabric-btn--${s}`).join(' ')}
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
