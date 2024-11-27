import {notFound} from 'next/navigation'

import {getTagMap} from '@/libs/mdx'
import HashTag from '@/components/icons/HashTag'
import PostList from '@/components/PostList'
import type {ITagParams} from '../../metadata'
export {generateMetadata} from '../../metadata'

export const dynamicParams = false

export async function generateStaticParams () {
    return Object.keys(await getTagMap()).map(tag => ({tag: encodeURIComponent(tag)}))
}

export default async function Page ({params}: {params: Promise<ITagParams>}) {
    const {tag} = await params
    const tagMap = await getTagMap()
    const tagName = decodeURIComponent(decodeURIComponent(tag))
    const posts = tagMap[tagName]

    if (!posts) notFound()

    return (
        <>
            <h1>
                <HashTag />
                {tagName}
            </h1>
            <p>
                {posts.length}
                {' '}
                {posts.length > 1 ? 'posts' : 'post'}
                {' '}
                tagged as
                {' '}
                <cite>{tagName}</cite>
            </p>
            <PostList posts={posts} />
        </>
    )
}
