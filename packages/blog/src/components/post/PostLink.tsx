import {ReactNode, isValidElement, InvalidEvent} from 'react'
import Link from 'next/link'

interface IProps {
    href?: string
    name?: string
    children?: ReactNode
}

export default function PostLink (props: IProps) {
    const {href = ''} = props

    const handleFaviconError = (e: InvalidEvent<HTMLImageElement>) => {
        e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    }

    if (href.startsWith('http') && (
        typeof props.children === 'string' || (isValidElement(props.children) && props.children.type === 'em')
    )) {
        const url = new URL(href)
        const favicon = `https://unavatar.io/${url.hostname}`
        return (
            <>
                <img role="favicon" loading="lazy" src={favicon} alt="" aria-hidden onError={handleFaviconError} />
                <a {...props} href={props.href} />
            </>
        )
    }

    if (href.startsWith('/')) return <Link {...props} href={props.href!} />

    return <a {...props} href={props.href} />
}
