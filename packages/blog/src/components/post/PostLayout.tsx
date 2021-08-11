import {ReactNode} from 'react'

import Head from 'src/components/Head'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'


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
