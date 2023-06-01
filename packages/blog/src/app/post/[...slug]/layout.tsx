
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
    const {scope} = await serializePost(decodeURIComponent(slug.join('/')))

    return {
        title: `${scope.title} | Yang`,
        description: scope.abstract,
    }
}

export default async function Layout ({
    children,
    params: {slug},
}: {
    children: React.ReactNode
    params: IParams
}) {
    const {scope} = await serializePost(decodeURIComponent(slug.join('/')))

    return (
        <>
            <Header title={scope.title} />
            <Zoom />
            {children}
            <Footer slug={slug.join('/')} />
        </>
    )
}
