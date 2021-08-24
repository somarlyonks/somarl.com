const fs = require('fs')
const matter = require('gray-matter')
const path = require('path')
const RSS = require('rss')

const SITE_URL = "https://blog.somarl.com"
const POSTS_PATH = './posts'
const OUTPUT_PATH = './public/rss.xml'

const feed = new RSS({
    title: "Yang's Blogs",
    feed_url: SITE_URL + "/rss.xml",
    site_url: SITE_URL,
    image_url: SITE_URL + '/192.png',
    webMaster: 'Yang',
    copyright: `${new Date().getFullYear()} Yang`,
    pubDate: new Date().toUTCString(),
})

fs.readdirSync(POSTS_PATH).filter(filename => /\.mdx?$/.test(filename)).forEach(filename => {
    const slug = filename.replace(/\.mdx?$/, '')
    const filepath = path.join(POSTS_PATH, filename)
    const file = fs.readFileSync(filepath)
    const {data: {
        title,
        published,
        // language,
        abstract = '',
        tags = [],
        // cover = '',
    }} = matter(file)

    feed.item({
        title,
        description: abstract,
        url: `${SITE_URL}/post/${slug}`,
        categories: tags,
        author: 'Yang',
        date: published,
    })
})

fs.writeFileSync(OUTPUT_PATH, feed.xml({indent: true}))
