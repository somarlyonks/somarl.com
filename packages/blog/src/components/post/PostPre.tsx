import {ReactNode} from 'react'


interface IProps {
    children: ReactNode
}

export default function PostPre ({children}: IProps) {
    return <pre>{children}</pre>
}
