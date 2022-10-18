import {GetStaticPaths, InferGetStaticPropsType, GetStaticProps} from 'next'
import Head from '../../components/Head'
import Footer from '../../components/Footer'
import PostList from '../../components/PostList'
import HashTag from '../../components/icons/HashTag'

import type {ParsedUrlQuery} from 'querystring'
import {getTagMap} from '../../libs/mdx'


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
            <Head title={`${tag} | Yang`} description="I'm a Web developer based in Shanghai." />
            <article>
                <h1><HashTag />{tag}</h1>
                <p>{posts.length} {posts.length > 1 ? 'posts' : 'post'} tagged as <cite>{tag}</cite></p>
                <PostList posts={posts} />
            </article>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps<IProps, IStaticProps> = async ({params: {tag} = {tag: ''}}) => {
    const tagMap = await getTagMap()
    const posts = tagMap[tag]

    return {
        props: {
            tag,
            posts,
        },
    }
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async ctx => {
    const tagMap = await getTagMap()

    return {
        paths: Object.keys(tagMap).map(tag => ({
            params: {
                tag,
            },
        })),
        fallback: false,
    }
}
