import RSS from 'rss'

import {getPosts} from '@/libs/mdx'

export async function GET () {
    const SITE_URL = 'https://blog.somarl.com'

    const feed = new RSS({
        title: 'Yang\'s Blogs',
        feed_url: `${SITE_URL}/rss.xml`,
        site_url: SITE_URL,
        image_url: `${SITE_URL}/192.png`,
        webMaster: 'Yang Sheng',
        copyright: `${new Date().getFullYear()} Yang`,
        pubDate: new Date().toUTCString(),
    })

    const posts = await getPosts()

    posts.forEach(({scope: {title, abstract, url, tags, published}}) => feed.item({
        title,
        description: abstract,
        url: `${SITE_URL}${url}`,
        categories: tags,
        author: 'Yang',
        date: published,
    }))

    return new Response(feed.xml({indent: true}), {headers: {'Content-Type': 'application/xml'}})
}
