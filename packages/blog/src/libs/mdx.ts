import {readdir, readFile, stat} from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const POSTS_ROOT = path.join(process.cwd(), 'posts')

async function collectPostInDirectory (directoryPath: string, pathPrefix = ''): Promise<string[]> {
    const fileNames = await readdir(directoryPath)
    const stepChildren = await Promise.all(fileNames.map(async (fileName) => {
        const filePath = path.join(directoryPath, fileName)
        const fileSlug = path.join(pathPrefix, fileName)

        if ((await stat(filePath)).isDirectory()) return collectPostInDirectory(filePath, fileSlug)
        if (/\.mdx?$/.test(fileName)) return fileSlug
        return
    }))

    return stepChildren.filter(Boolean).flat(Infinity).filter(Boolean) as string[]
}

const getPostFilenames = async () => collectPostInDirectory(POSTS_ROOT)

export const getPostSlugs = async () => (await getPostFilenames()).map(filename => filename.replace(/\.mdx?$/, ''))

const postSlugToPath = (slug: string) => path.join(POSTS_ROOT, `${slug}.mdx`)

export const getPosts = async () => (await readPosts(await getPostSlugs())).sort(
    (l, r) => (new Date(r.published).valueOf() - new Date(l.published).valueOf()),
)

const readPosts = async (slugs: string[]) => Promise.all(slugs.map(readPostMatter))

export async function readPostMatter (slug: string) {
    const file = await readFile(postSlugToPath(slug))

    return bleachPostMatter(slug, matter(file).data)
}

export function bleachPostMatter (slug: string, matter: object): IPostMeta {
    const {
        title,
        published,
        language,
        abstract = '',
        tags = [],
        collection = '',
        cover = '',
    } = matter as ANY

    return {
        url: `/post/${slug}`,
        title,
        published,
        language,
        abstract,
        tags,
        collection,
        cover: (cover && !cover.src) ? {src: cover} : cover,
    }
}

export const getTagMap = async () => getPosts().then(posts => posts.reduce(
    (r, post) => Object.assign(r, Object.fromEntries(post.tags.map(tag => [tag, (r[tag] || []).concat(post)]))),
    {} as Record<string, IPostMeta[]>,
))

export const getCollectionMap = async () => getPosts().then(posts => posts.reduce((r, post) => {
    const {collection} = post
    if (!collection) return r
    return Object.assign(r, {[collection]: [post].concat(r[collection] || [])})
}, {} as Record<string, IPostMeta[]>))
