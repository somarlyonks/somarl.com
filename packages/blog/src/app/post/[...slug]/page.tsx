import {PostInfo, PostTitle, PostCollection, PostContent} from '@/components/post'
import {getPostSlugs, serializePost, searchMDXComponentInSource, getCollectionMap} from '@/libs/mdx'
import type {IProps} from './layout'

export const dynamicParams = false

export async function generateStaticParams () {
    return (await getPostSlugs()).map(slug => ({slug: slug.split('/').map(encodeURIComponent)}))
}

export default async function Page ({params}: IProps) {
    const {slug} = await params
    const {
        compiledSource,
        scope,
        collection,
        extraComponents,
    } = await getStaticProps(slug)

    return (
        <article lang={scope.language || 'en'}>
            <PostTitle post={scope} />
            <PostContent compiledSource={compiledSource} extraComponents={extraComponents} scope={scope} />
            {!!(scope.collection && collection) && <PostCollection post={scope} collection={collection} />}
            <PostInfo post={scope} />
        </article>
    )
}

const getStaticProps = async (slug: string[]) => {
    const {compiledSource, scope} = await serializePost(decodeURIComponent(decodeURIComponent(slug.join('/'))))
    const extraComponents = searchMDXComponentInSource(compiledSource)
    const collectionMap = await getCollectionMap()
    const collection = collectionMap[scope.collection] || undefined

    return {
        compiledSource,
        scope,
        collection,
        extraComponents,
    }
}
