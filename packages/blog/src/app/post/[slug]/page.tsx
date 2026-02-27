import PostToc from '@/components/post/PostToc'
import PostInfo from '@/components/post/PostInfo'
import PostTitle from '@/components/post/PostTitle'
import PostCollection from '@/components/post/PostCollection'
import {getPostSlugs, bleachPostMatter, getCollectionMap} from '@/libs/mdx'
import type {IProps} from './layout'

export const dynamicParams = false

export async function generateStaticParams () {
    return (await getPostSlugs()).map(slug => ({slug}))
}

export default async function Page ({params}: IProps) {
    const {slug} = await params
    const {default: PostContent, frontmatter} = await import(`@/posts/${decodeURIComponent(slug)}.mdx`)
    const post = bleachPostMatter(slug, frontmatter)
    const collectionMap = await getCollectionMap()
    const collection = collectionMap[post.collection] || undefined

    return (
        <article lang={post.language || 'en'}>
            <PostTitle post={post} />
            <PostContent />
            <PostToc />
            {!!(post.collection && collection) && <PostCollection post={post} collection={collection} />}
            <PostInfo post={post} />
        </article>
    )
}
