import {GetStaticProps, InferGetStaticPropsType} from 'next'
import Head from '../components/Head'
import Footer from '../components/Footer'
import PostList from '../components/PostList'

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
                <PostList posts={posts} />
            </article>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps<IProps, {}> = async () => {
    const posts = postsSync().map(post => post.scope)

    return {
        props: {
            posts,
        },
    }
}
