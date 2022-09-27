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
    const handleFaviconError = (e: React.InvalidEvent<HTMLImageElement>) => {
        e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    }

    if (href.startsWith('http') && (
        typeof props.children === 'string' || (isValidElement(props.children) && props.children.type === 'em')
    )) {
        const url = new URL(href)
        const favicon = `https://unavatar.io/${url.hostname}`
        return <><img role="favicon" loading="lazy" src={favicon} alt="" aria-hidden onError={handleFaviconError} /><Link href={props.href}><a name={name} {...props} /></Link></>
    }

    return <Link href={props.href}><a name={name} {...props} /></Link>
}
