import {ReactNode, isValidElement} from 'react'
import Link from 'next/link'


interface IProps {
    href: string
    name?: string
    children?: ReactNode
}

export default function PostLink (props: IProps) {
    const {href = ''} = props
    const name = href.startsWith('#') && encodeURIComponent(href.slice(1)) !== href.slice(1)
        ? encodeURIComponent(href.slice(1))
        : undefined

    if (href.startsWith('http') && (
        typeof props.children === 'string' || (isValidElement(props.children) && props.children.type === 'em')
    )) {
        const url = new URL(href)
        const favicon = `https://www.google.com/s2/favicons?domain=${url.hostname}`
        return <><img role="favicon" src={favicon} /><Link href={props.href}><a name={name} {...props} /></Link></>
    }

    return <Link href={props.href}><a name={name} {...props} /></Link>
}
