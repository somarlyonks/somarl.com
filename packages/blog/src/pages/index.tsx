import {GetStaticProps, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from '../components/Head'
import Footer from '../components/Footer'
import PostInfo from '../components/post/PostInfo'

import {postsSync} from '../libs/mdx'


interface IProps {
    posts: IPostMeta[]
}

export default function Home ({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head title="Blogs | Yang" description="I'm a Web developer at LearningTribes based in Shanghai." />
            <article>
                <h1>Blogs</h1>
                {posts.map(post => (
                    <Link href={post.url} key={post.title}>
                        <section role="figure">
                            <figure>
                                <figcaption>
                                    <PostInfo post={post} />
                                    <h2><Link href={post.url}>{post.title}</Link></h2>
                                    {post.abstract && <p>{post.abstract}</p>}
                                </figcaption>
                            </figure>
                        </section>
                    </Link>
                ))}
            </article>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps<IProps, {}> = async () => {
    const posts = postsSync.map(post => post.scope)

    return {
        props: {
            posts,
        },
    }
}
