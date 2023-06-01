import Footer from '../components/Footer'
import PostList from '../components/PostList'

import {getPosts} from '../libs/mdx'


export default async function Page () {
    const posts = await getPosts().then(ps => ps.map(post => post.scope))

    return (
        <>
            <article>
                <h1>Blogs</h1>
                <PostList posts={posts} />
            </article>
            <Footer />
        </>
    )
}
