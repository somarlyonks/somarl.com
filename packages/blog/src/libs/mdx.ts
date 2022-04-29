import {readdirSync, readFileSync, statSync} from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
import remarkSlug from 'remark-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import remarkGFM from 'remark-gfm'
import remarkSectionize from 'remark-sectionize'
import remarkUnwrapImages from 'remark-unwrap-images'
import {remarkShiki, rehypeShiki} from './shiki'


const POSTS_ROOT = path.join(process.cwd(), 'posts')

function collectPostInDirectory (directoryPath: string, pathPrefix = ''): string[] {
    return readdirSync(directoryPath).reduce((r, fileName) => {
        const filePath = path.join(directoryPath, fileName)
        const fileSlug = path.join(pathPrefix, fileName)
        if (statSync(filePath).isDirectory()) return r.concat(collectPostInDirectory(filePath, fileSlug))
        if (/\.mdx?$/.test(fileName)) return r.concat([fileSlug])
        return r
    }, [] as string[])
}

export const postFilenamesSync = () => collectPostInDirectory(POSTS_ROOT)

export const postSlugsSync = postFilenamesSync().map(filename => filename.replace(/\.mdx?$/, ''))

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

export const readPost = (slug: string) => {
    const file = readFileSync(postSlugToPath(slug))
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

    const scope = {
        url: `/post/${slug}`,
        title,
        published,
        language,
        abstract,
        tags,
        collection,
        cover: (cover && !cover.src) ? {src: cover} : cover,
    } as IPostMeta

    return {
        content,
        scope,
    }
}

const readPosts = (slugs: string[]) => slugs.reduce((r, slug) => {
    try {
        return r.concat(readPost(slug))
    } catch (err) {
        console.error(err)
        return r
    }
}, [] as Array<R<typeof readPost>>)

export const postsSync = () => readPosts(postSlugsSync)
    .sort((l, r) => (new Date(r.scope.published).valueOf() - new Date(l.scope.published).valueOf()))

export const tagMapSync = postsSync().reduce((r, post) =>
    Object.assign(r, Object.fromEntries(post.scope.tags.map(tag => [tag, (r[tag] || []).concat(post.scope)]))),
    {} as Record<string, IPostMeta[]>
)

export const collectionMapSync = postsSync().reduce((r, post) => {
    const {collection} = post.scope
    if (!collection) return r
    return Object.assign(r, {[collection]: [post.scope].concat(r[collection] || [])})
}, {} as Record<string, IPostMeta[]>)

export const serializePost = async (slug: string) => {
    const {content, scope} = readPost(slug)

    return serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                remarkSlug,
                remarkToc,
                remarkUnwrapImages,
                // @ts-ignore
                remarkSectionize,
                remarkGFM,
                [remarkShiki, {darkTheme: 'github-dark', lightTheme: 'github-light'}],
            ],
            rehypePlugins: [
                [rehypeShiki],
                // @ts-ignore
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

export const searchMDXComponentInSource = (source: string, components: string[]) => Object.fromEntries(
    components.map(component => [component, new RegExp(`_jsx\\(${component},`).test(source)])
)
