import {ReactNode} from 'react'


interface IProps {
    className?: string
    children: ReactNode
}

export default function PostUl ({className, children}: IProps) {
    if (className === 'contains-task-list') return <ul role="listbox">{children}</ul>
    return <ul>{children}</ul>
}
