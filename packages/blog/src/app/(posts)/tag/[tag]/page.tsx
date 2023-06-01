
import {Metadata} from 'next'

import {getTagMap} from '../../../../libs/mdx'
import HashTag from '../../../../components/icons/HashTag'
import PostList from '../../../../components/PostList'

interface IParams {
    tag: string
}

export async function generateMetadata ({params: {tag}}: {
    params: IParams
}): Promise<Metadata> {
    return {
        title: `${tag} | Yang`,
    }
}

export async function generateStaticParams () {
    return Object.keys(await getTagMap())
}

export default async function Page ({params: {tag}}: {params: IParams}) {
    const tagMap = await getTagMap()
    const tagName = decodeURIComponent(tag)
    const posts = tagMap[tagName]

    return (
        <>
            <h1><HashTag />{tagName}</h1>
            <p>{posts.length} {posts.length > 1 ? 'posts' : 'post'} tagged as <cite>{tagName}</cite></p>
            <PostList posts={posts} />
        </>
    )
}
