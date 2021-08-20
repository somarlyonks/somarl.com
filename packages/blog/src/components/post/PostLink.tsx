import Link from 'next/link'


interface IProps {
    href: string
    name?: string
}

export default function PostLink (props: IProps) {
    const {href = ''} = props
    const name = href.startsWith('#') && encodeURIComponent(href.slice(1)) !== href.slice(1)
        ? encodeURIComponent(href.slice(1))
        : undefined

    return <Link href={props.href}><a name={name} {...props} /></Link>
}
