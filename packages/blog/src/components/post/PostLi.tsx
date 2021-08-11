import {ReactNode, isValidElement} from 'react'


interface IProps {
    children: ReactNode
}

export default function PostLi ({children}: IProps) {
    if (Array.isArray(children)) {
        const [checkbox, ...restChildren] = children
        if (isValidElement<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(checkbox) && checkbox.props.type === 'checkbox') return (
            <li>
                <input type="checkbox" checked={checkbox.props.checked} readOnly />
                {restChildren}
            </li>
        )
    }

    return <li>{children}</li>
}
