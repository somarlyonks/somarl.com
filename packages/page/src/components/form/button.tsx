import { h } from 'preact'
import * as Icons from '../icons'


interface IButtonProps {
  label: S
  loading?: boolean // TODO: loading
  disabled?: boolean
  classNames?: L<S>
  labelClassName?: S
  onClick?: h.JSX.MouseEventHandler
  style?: S | {[key: string]: S | N}
}

/**
 * @description magic words: 'primary', 'borderless'
 * @example
 *   <Button label="primary" classNames={['primary', 'borderless']} />
 */
const Button = ({
  label,
  loading = false,
  disabled = false,
  classNames = [],
  labelClassName = '',
  onClick = () => {},
  style = '',
}: IButtonProps) => (
  <button
    onClick={onClick}
    className={'fabric-btn ' + classNames.map(s => `${s} fabric-btn--${s}`).join(' ')}
    style={style}
    disabled={disabled || loading}
  >
    <span class="fabric-wrapper">
      <span class="fabric-container">
        {loading
          ? <Icons.Loading style="transform: scale(0.75);" />
          : <span class={'fabric-btn__label ' + labelClassName}>{label}</span>
        }
      </span>
    </span>
  </button>
)

export default Button
