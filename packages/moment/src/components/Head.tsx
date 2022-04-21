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
            {description && <meta name="description" content={description} />}

            {children}
        </Head>
    )
}
