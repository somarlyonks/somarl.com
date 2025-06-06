import {PropsWithChildren, isValidElement, DetailedHTMLProps, InputHTMLAttributes} from 'react'

interface IProps extends PropsWithChildren {
    id?: string
}

export default function PostLi ({id, children}: IProps) {
    if (Array.isArray(children)) {
        const [checkbox, ...restChildren] = children
        if (isValidElement<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(checkbox) && checkbox.props.type === 'checkbox') return (
            <li id={id}>
                <input type="checkbox" checked={checkbox.props.checked} readOnly />
                {restChildren}
            </li>
        )
    }

    return <li id={id}>{children}</li>
}
