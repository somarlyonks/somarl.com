import {PropsWithChildren} from 'react'

interface IProps extends PropsWithChildren {
    className?: string
}

export default function PostUl ({className, children}: IProps) {
    if (className === 'contains-task-list') return <ul role="listbox">{children}</ul>
    return <ul>{children}</ul>
}
