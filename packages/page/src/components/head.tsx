
import Head from 'next/head'
import {ReactNode} from 'react'


interface IProps {
    title: string
    description?: string
    children?: ReactNode
}

export default function CustomHead ({title, description, children}: IProps) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />

            {description && <meta name="description" content={description} />}
            <meta name="robots" content="all" />

            {children}
        </Head>
    )
}
