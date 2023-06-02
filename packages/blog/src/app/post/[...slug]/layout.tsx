
import {Metadata} from 'next'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Zoom from '../../../components/post/scripts/Zoom'
import {serializePost} from '../../../libs/mdx'


export interface IParams {
    slug: string[]
}

export async function generateMetadata ({params: {slug}}: {
    params: IParams
}): Promise<Metadata> {
    const {scope} = await serializePost(decodeURIComponent(decodeURIComponent(slug.join('/'))))
    const title = `${scope.title} | Yang`
    const description = scope.abstract
    const images = scope.cover && [{
        url: scope.cover.src,
        width: scope.cover.width,
        height: scope.cover.height,
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
        }
    }
}

export default async function Layout ({
    children,
    params: {slug},
}: {
    children: React.ReactNode
    params: IParams
}) {
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
