import {ReactNode} from 'react'

import Head from '../head'
import Header from '../header'
import Footer from '../footer'


interface IProps {
    slug: string
    title: string
    description?: string
    children?: ReactNode
}

export default function Layout ({slug, title, description, children}: IProps) {
    return (
        <>
            <Head title={title + ' | Yang'} description={description} />
            <Header title={title} />
            {children}
            <Footer slug={slug} />
        </>
    )
}
