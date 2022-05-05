import Link from 'next/link'
import Image from 'next/image'
import PostInfo from './post/PostInfo'


interface IProps {
    posts: IPostMeta[]
}

export default function PostList ({posts}: IProps) {
    return (
        <>
            {posts.map((post, postIndex) => (
                <Link href={post.url} key={post.title}>
                    <section role="figure">
                        <figure>
                            {!!post.cover && (
                                <Image
                                    layout="raw" width="100vw" height="55vw" priority={postIndex < 5}
                                    src={post.cover.src} alt="cover" title={post.title}
                                />
                            )}
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
