import PostList from '../../../../components/PostList'
import Book from '../../../../components/icons/Book'

import {getCollectionMap} from '../../../../libs/mdx'


interface IParams {
    collection: string
}

export async function generateStaticParams () {
    return Object.keys(await getCollectionMap())
}

export default async function Collection ({params: {collection}}: {params: IParams}) {
    const collectionMap = await getCollectionMap()
    const collectionName = decodeURIComponent(collection)
    const posts = collectionMap[collectionName]

    return (
        <>
            <h1><Book />{collectionName}</h1>
            <p>{posts.length} {posts.length > 1 ? 'posts' : 'post'} in collection <cite>{collectionName}</cite></p>
            <PostList posts={posts} />
        </>
    )
}
