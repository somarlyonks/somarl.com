import Link from 'next/link'


interface IProps {
    href: string
}

export default function PostLink (props: IProps) {
    return <Link href={props.href}><a {...props} /></Link>
}
