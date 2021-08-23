import Link from 'next/link'
import PostInfo from './post/PostInfo'


interface IProps {
    posts: IPostMeta[]
}

export default function PostList ({posts}: IProps) {
    return (
        <>
            {posts.map(post => (
                <Link href={post.url} key={post.title}>
                    <section role="figure">
                        <figure>
                            {!!post.cover && <img src={post.cover} alt="cover" title={post.title} />}
                            <figcaption>
                                <PostInfo post={post} />
                                <h2><Link href={post.url}>{post.title}</Link></h2>
                                {post.abstract && <p>{post.abstract}</p>}
                            </figcaption>
                        </figure>
                    </section>
                </Link>
            ))}
        </>
    )
}
