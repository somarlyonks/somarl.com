import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import PostList from '../../../../components/PostList'
import Book from '../../../../components/icons/Book'

import {getCollectionMap} from '../../../../libs/mdx'


interface IParams {
    collection: string
}

const dynamicParams = false
export {dynamicParams}

export async function generateMetadata ({params: {collection}}: {
    params: IParams
}): Promise<Metadata> {
    return {
        title: `${collection} | Yang`,
    }
}

export async function generateStaticParams () {
    return Object.keys(await getCollectionMap()).map(collection => ({collection}))
}

export default async function Collection ({params: {collection}}: {params: IParams}) {
    const collectionMap = await getCollectionMap()
    const collectionName = decodeURIComponent(collection)
    const posts = collectionMap[collectionName]

    if (!posts) notFound()

    return (
        <>
            <h1><Book />{collectionName}</h1>
            <p>{posts.length} {posts.length > 1 ? 'posts' : 'post'} in collection <cite>{collectionName}</cite></p>
            <PostList posts={posts} />
        </>
    )
}
