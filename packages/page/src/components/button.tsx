
import Flex from 'src/components/flex'
import {moduledBem} from '@csszen/hooks.usebem'
import styles from './button.module.scss'


const useBem = moduledBem(styles)

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset'
    name?: string
    label?: string
    loading?: boolean
    disabled?: boolean
    className?: string
    labelClassName?: string
    primary?: boolean
    borderless?: boolean
    onClick?: JSX.IntrinsicElements['button']['onClick']
}


export default function Button ({
    type = 'button',
    name,
    label,
    loading = false,
    disabled = false,
    className = '',
    labelClassName = '',
    onClick,
    primary = false,
    borderless = false,
}: IButtonProps) {
    return (
        <button
            type={type}
            name={name}
            className={useBem('button', '', {primary, borderless}) + ` ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            <Flex>
                <span className={styles.button__label + ' ' + labelClassName}>{label}</span>
            </Flex>
        </button>
    )
}
