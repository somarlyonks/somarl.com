import {GetStaticProps, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from 'src/components/Head'
import Footer from 'src/components/Footer'
import PostTime from 'src/components/post/PostTime'

import matter from 'gray-matter'
import {readFileSync} from 'fs'
import {postFilesSync} from 'src/libs/mdx'


interface IProps {
    blogs: IPostMeta[]
}

export default function Home ({blogs}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head title="Blogs | Yang" description="I'm a Web developer at LearningTribes based in Shanghai." />
            <article>
                <h1>Blogs</h1>
                {
                    blogs.map(blog => (
                        <Link href={blog.url} key={blog.title}>
                            <section role="figure">
                                <figure>
                                    <figcaption>
                                        <PostTime post={blog} />
                                        <h2><Link href={blog.url}>{blog.title}</Link></h2>
                                        {blog.abstract && <p>{blog.abstract}</p>}
                                    </figcaption>
                                </figure>
                            </section>
                        </Link>
                    ))
                }
            </article>
            <Footer />
        </>
    )
}

export const getStaticProps: GetStaticProps<IProps, {}> = async () => {
    const blogs = postFilesSync.map(({slug, path}) => {
        const file = readFileSync(path)
        const data = matter(file).data as IPostMeta
        return ({
            url: `/post/${slug}`,
            title: data.title,
            abstract: data.abstract,
            published: data.published,
        })
    }).sort((l, r) => (new Date(r.published).valueOf() - new Date(l.published).valueOf()))

    return {
        props: {
            blogs,
        },
    }
}
