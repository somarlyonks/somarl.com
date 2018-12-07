
import type {ReactNode} from 'react'
import {moduledBem} from '@csszen/hooks.usebem'
import styles from './flex.module.scss'


const useBem = moduledBem(styles)

interface IProps {
    className?: string
    children?: ReactNode
    full?: boolean
    central?: boolean
    verticle?: boolean
    grow?: boolean
    shrink?: boolean
    wrap?: boolean
}

export default function Fabric ({
    className = '',
    children,
    central,
    full = false,
    verticle = false,
    grow = false,
    shrink = false,
    wrap = false,
}: IProps) {
    const _className = useBem('flex', '', {full, verticle, grow, shrink, wrap}) + ` ${className}`

    if (central) return (
        <div className={_className}>
            <div className={styles['flex-container']}>
                {children}
            </div>
        </div>
    )

    return (
        <div className={_className}>
            {children}
        </div>
    )
}
