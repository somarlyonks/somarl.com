import Link from 'next/link'
import PostTime from './PostTime'
import HashTag from '../icons/HashTag'


interface IProps {
    post: IPostMeta
}

export default function PostInfo ({post}: IProps) {
    return (
        <div role="contentinfo">
            <PostTime post={post} />
            {post.tags.map(tag => (
                <Link href={`/tag/${tag}`} key={tag}><a role="button"><HashTag />{tag}</a></Link>
            ))}
        </div>
    )
}
