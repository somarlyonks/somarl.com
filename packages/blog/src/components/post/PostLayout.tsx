import {ReactNode} from 'react'

import Head from '../Head'
import Header from '../Header'
import Footer from '../Footer'
import Zoom from './scripts/Zoom'


interface IProps {
    slug: string
    scope: IPostMeta
    children?: ReactNode
}

export default function Layout ({slug, scope, children}: IProps) {
    return (
        <>
            <Head title={scope.title + ' | Yang'} description={scope.abstract}>
                <meta property="og:title" content={scope.title} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://blog.somarl.com/post/${slug}`} />
                {!!scope.cover && <meta property="og:image" content={scope.cover.src} />}
                <meta property="og:article:author" content="Yang" />
                <meta property="og:article:published_time" content={scope.published} />
                {scope.tags.map(tag => <meta key={tag} property="og:article:tag" content={tag} />)}
            </Head>
            <Header title={scope.title} />
            <Zoom />
            {children}
            <Footer slug={slug} />
        </>
    )
}
