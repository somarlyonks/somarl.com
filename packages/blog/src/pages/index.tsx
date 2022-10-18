import {GetStaticProps, InferGetStaticPropsType} from 'next'

import Head from '../components/Head'
import Footer from '../components/Footer'
import PostList from '../components/PostList'

import {getPosts} from '../libs/mdx'


interface IProps {
    posts: IPostMeta[]
}

export default function Home ({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head title="Blogs | Yang" description="I'm a Web developer based in Shanghai." />
            <article>
                <h1>Blogs</h1>
                <PostList posts={posts} />
            </article>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps<IProps, {}> = async () => {
    const posts = await getPosts().then(ps => ps.map(post => post.scope))

    return {
        props: {
            posts,
        },
    }
}
