'use client'

import {forwardRef} from 'react'
import Flex from './Flex'
import {useBem} from '../libs/useBem'

interface IProps {
    type?: 'button' | 'submit' | 'reset'
    name?: string
    label?: string
    loading?: boolean
    disabled?: boolean
    className?: string
    primary?: boolean
    borderless?: boolean
    onClick?: JSX.IntrinsicElements['button']['onClick']
}

export default forwardRef<HTMLButtonElement, IProps>(({
    type = 'button',
    name,
    label,
    loading = false,
    disabled = false,
    className = '',
    onClick,
    primary = false,
    borderless = false,
}, ref) => (
    <button
        ref={ref}
        type={type}
        name={name}
        className={useBem('button', '', {primary, borderless}) + ` ${className}`}
        disabled={disabled || loading}
        onClick={onClick}
    >
        <Flex>
            <span role="button">{label}</span>
        </Flex>
    </button>
))
