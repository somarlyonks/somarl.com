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
                <section role="figure" key={post.title}>
                    <figure role="img">
                        {!!post.cover && (
                            <Image
                                priority={postIndex < 5}
                                {...post.cover}
                                fill
                                placeholder="empty"
                                src={post.cover.src}
                                alt="cover"
                                title={post.title}
                            />
                        )}
                        <figcaption>
                            <Link role="button" href={post.url} />
                            <PostInfo post={post} />
                            <h2><Link href={post.url}>{post.title}</Link></h2>
                            {post.abstract && <p>{post.abstract}</p>}
                        </figcaption>
                    </figure>
                </section>
            ))}
        </>
    )
}
