import {notFound} from 'next/navigation'

import PostList from '@/components/PostList'
import Book from '@/components/icons/Book'
import {getCollectionMap} from '@/libs/mdx'
import type {ICollectionParams} from '../../metadata'
export {generateMetadata} from '../../metadata'

export const dynamicParams = false

export async function generateStaticParams () {
    return Object.keys(await getCollectionMap()).map(collection => ({collection: encodeURIComponent(collection)}))
}

export default async function Collection ({params}: {params: Promise<ICollectionParams>}) {
    const {collection} = await params
    const collectionMap = await getCollectionMap()
    const collectionName = decodeURIComponent(decodeURIComponent(collection))
    const posts = collectionMap[collectionName]

    if (!posts) notFound()

    return (
        <>
            <h1>
                <Book />
                {collectionName}
            </h1>
            <p>{posts.length} {posts.length > 1 ? 'posts' : 'post'} in collection <cite>{collectionName}</cite></p>
            <PostList posts={posts} />
        </>
    )
}
