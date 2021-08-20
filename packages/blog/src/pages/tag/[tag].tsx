import {GetStaticPaths, InferGetStaticPropsType, GetStaticProps} from 'next'
import Link from 'next/link'
import Head from '../../components/Head'
import Footer from '../../components/Footer'
import PostInfo from '../../components/post/PostInfo'
import HashTag from '../../components/icons/HashTag'

import type {ParsedUrlQuery} from 'querystring'
import {tagMapSync} from '../../libs/mdx'


interface IProps {
    tag: string
    posts: IPostMeta[]
}

interface IStaticProps extends ParsedUrlQuery {
    tag: string
}

export default function Tag ({posts, tag}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head title={`${tag} | Yang`} description="I'm a Web developer at LearningTribes based in Shanghai." />
            <article>
                <h1><HashTag />{tag}</h1>
                <p>{posts.length} {posts.length > 1 ? 'posts' : 'post'} tagged as <cite>{tag}</cite></p>
                {posts.map(blog => (
                    <Link href={blog.url} key={blog.title}>
                        <section role="figure">
                            <figure>
                                <figcaption>
                                    <PostInfo post={blog} />
                                    <h2><Link href={blog.url}>{blog.title}</Link></h2>
                                    {blog.abstract && <p>{blog.abstract}</p>}
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

export const getStaticProps: GetStaticProps<IProps, IStaticProps> = async ({params: {tag} = {tag: ''}}) => {
    const posts = tagMapSync[tag]

    return {
        props: {
            tag,
            posts,
        },
    }
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async ctx => {
    return {
        paths: Object.keys(tagMapSync).map(tag => ({
            params: {
                tag,
            },
        })),
        fallback: false,
    }
}
