import {ReactNode} from 'react'
import Link from 'next/link'

import Flex from './Flex'

interface IProps {
    title: string
    children?: ReactNode
}

export default function Header ({title, children}: IProps) {
    return (
        <header>
            <Flex grow>
                <Link href="/"><img role="button" src="/images/pangurban.jpg" /></Link>
                <nav>{title}</nav>
                {children}
            </Flex>
        </header>
    )
}
