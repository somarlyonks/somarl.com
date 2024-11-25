import {PropsWithChildren} from 'react'
import {useBem} from '../libs/useBem'


interface IFlexProps extends PropsWithChildren {
    className?: string
    full?: boolean
    central?: boolean
    verticle?: boolean
    grow?: boolean
    shrink?: boolean
    wrap?: boolean
}

export default function Flex ({
    className = '',
    children,
    central,
    full,
    verticle,
    grow,
    shrink,
    wrap,
}: IFlexProps) {
    const _className = useBem('flex', '', {full, verticle, grow, shrink, wrap}) + ` ${className}`

    if (central) return (
        <div className={_className}>
            <div className="flex-container">
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
