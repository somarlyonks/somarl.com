import {ReactNode, isValidElement} from 'react'
import Link from 'next/link'
import Favicon from './PostLinkFavicon'

interface IProps {
    href?: string
    name?: string
    children?: ReactNode
}

export default function PostLink (props: IProps) {
    const {href = ''} = props

    if (href.startsWith('http') && (
        typeof props.children === 'string' || (isValidElement(props.children) && props.children.type === 'em')
    )) {
        const url = new URL(href)
        const favicon = `https://unavatar.io/${url.hostname}`
        return (
            <>
                <Favicon src={favicon} />
                <a {...props} href={props.href} />
            </>
        )
    }

    if (href.startsWith('/')) return <Link {...props} href={props.href!} />

    return <a {...props} href={props.href} />
}
