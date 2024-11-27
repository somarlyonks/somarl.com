import {PropsWithChildren} from 'react'
import {Metadata} from 'next'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Zoom from '@/components/post/scripts/Zoom'
import {serializePost} from '@/libs/mdx'

export interface IProps {
    params: Promise<{
        slug: string[]
    }>
}

export async function generateMetadata ({params}: IProps): Promise<Metadata> {
    const {slug} = await params
    const {scope} = await serializePost(decodeURIComponent(decodeURIComponent(slug.join('/'))))
    const title = `${scope.title} | Yang`
    const description = scope.abstract
    const images = scope.cover && [{
        url: scope.cover.src,
    }]

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/blog/${slug.join('/')}`,
            siteName: 'Yang',
            type: 'article',
            publishedTime: scope.published,
            authors: 'Yang Sheng',
            images,
        },
    }
}

export default async function Layout ({
    children,
    params,
}: PropsWithChildren<IProps>) {
    const {slug} = await params
    const {scope} = await serializePost(decodeURIComponent(decodeURIComponent(slug.join('/'))))

    return (
        <>
            <Header title={scope.title} />
            <Zoom />
            {children}
            <Footer slug={slug.join('/')} />
        </>
    )
}
