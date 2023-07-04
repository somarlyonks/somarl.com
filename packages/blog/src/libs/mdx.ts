import {readdir, readFile, stat} from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGFM from 'remark-gfm'
import remarkSectionize from 'remark-sectionize'
import remarkUnwrapImages from 'remark-unwrap-images'

import {rehypePlaiceholder, plaiceholder} from './plaiceholder'
import {remarkShiki, rehypeShiki} from './shiki'
import {remarkToc} from './toc'


const POSTS_ROOT = path.join(process.cwd(), 'posts')

async function collectPostInDirectory (directoryPath: string, pathPrefix = ''): Promise<string[]> {
    const fileNames = await readdir(directoryPath)
    const stepChildren = await Promise.all(fileNames.map(async fileName => {
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

export const HastLinkIcon = {
    type: 'element',
    tagName: 'svg',
    properties: {
        className: ['octicon', 'octicon-link'],
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 16 16',
        version: '1.1',
        width: '16',
        height: '16',
    },
    children: [{
        type: 'element',
        tagName: 'path',
        properties: {
            fillRule: 'evenodd',
            d: 'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z',
        },
    }],
}

type MDXRemoteSerializeResult<TScope = Record<string, unknown>> = {
    compiledSource: string
    scope: TScope
}

export const getPosts = async () => (await readPosts(await getPostSlugs())).sort(
    (l, r) => (new Date(r.scope.published).valueOf() - new Date(l.scope.published).valueOf())
)

const readPosts = async (slugs: string[]) => Promise.all(slugs.map(readPost))

async function readPost (slug: string) {
    const file = await readFile(postSlugToPath(slug))

    const {content, data: {
        title,
        published,
        language,
        abstract = '',
        tags = [],
        collection = '',
        cover = '',
    }} = matter(file)

    if (!title) throw new Error('Broken post')

    const scope = await editCover({
        url: `/post/${slug}`,
        title,
        published,
        language,
        abstract,
        tags,
        collection,
        cover: (cover && !cover.src) ? {src: cover} : cover,
    })

    return {
        content,
        scope,
    }
}

export async function editCover (post: IPostMeta) {
    if (!post.cover) return post

    const {src} = post.cover
    if (!src) return post

    const {blurDataURL, width, height} = await plaiceholder(src)

    post.cover = {
        ...post.cover,
        width,
        height,
        blurDataURL,
        placeholder: 'blur',
    }

    return post
}

export const getTagMap = async () => getPosts().then(posts => posts.reduce((r, post) =>
    Object.assign(r, Object.fromEntries(post.scope.tags.map(tag => [tag, (r[tag] || []).concat(post.scope)]))),
    {} as Record<string, IPostMeta[]>
))

export const getCollectionMap = async () => getPosts().then(posts => posts.reduce((r, post) => {
    const {collection} = post.scope
    if (!collection) return r
    return Object.assign(r, {[collection]: [post.scope].concat(r[collection] || [])})
}, {} as Record<string, IPostMeta[]>))

export async function serializePost (slug: string) {
    const {content, scope} = await readPost(slug)

    return serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                remarkToc,
                remarkUnwrapImages,
                remarkSectionize,
                remarkGFM,
                [remarkShiki, {darkTheme: 'github-dark', lightTheme: 'github-light'}],
            ],
            rehypePlugins: [
                rehypeSlug,
                rehypeShiki,
                rehypePlaiceholder,
                [rehypeAutolinkHeadings, {
                    content: HastLinkIcon,
                    properties: {
                        ariaHidden: 'true',
                        tabIndex: -1,
                        role: 'button',
                    },
                }],
            ],
        },
        scope,
    }) as Promise<MDXRemoteSerializeResult<IPostMeta>>
}

export const DYNAMIC_COMPONENT_NAMES = [
    'NextJS',
    'MDXIcon',
    'IllustrationFlexWrapItems',
    'MyBikeTimeline',
] as const

export const searchMDXComponentInSource = (source: string) => (
    DYNAMIC_COMPONENT_NAMES.filter(component => new RegExp(`_jsx(DEV)?\\(${component},`).test(source))
)
