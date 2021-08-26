import Link from 'next/link'
import PostTime from './PostTime'
import HashTag from '../icons/HashTag'


interface IProps {
    post: IPostMeta
}

export default function PostInfo ({post}: IProps) {
    return (
        <div role="contentinfo">
            <section>
                <h2>Published</h2>
                <PostTime post={post} />
            </section>
            {!!post.tags.length && (
                <section>
                    <h2>Tags</h2>
                    {post.tags.map(tag => (
                        <Link href={`/tag/${tag}`} key={tag}><a role="button"><HashTag />{tag}</a></Link>
                    ))}
                </section>
            )}
        </div>
    )
}
