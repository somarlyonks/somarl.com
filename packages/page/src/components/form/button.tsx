import { h } from 'preact'


interface IButtonProps {
  label: S
  classNames?: L<S>
  labelClassName?: S
  onClick?: h.JSX.MouseEventHandler
  style?: string | {[key: string]: string | number}
}

/**
 * @description magic words: 'primary', 'borderless'
 * @example
 *   <Button label="primary" classNames={['primary', 'borderless']} />
 */
const Button = ({
  label,
  classNames = [],
  labelClassName = '',
  onClick = () => {},
  style = '',
}: IButtonProps) => (
  <button
    onClick={onClick}
    className={'fabric-btn ' + classNames.map(s => `${s} fabric-btn--${s}`).join(' ')}
    style={style}
  >
    <span class="fabric-wrapper">
      <span class="fabric-container">
        <span class={'fabric-btn__label ' + labelClassName}>{label}</span>
      </span>
    </span>
  </button>
)

export default Button
