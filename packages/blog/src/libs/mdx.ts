import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
import remarkSlug from 'remark-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import remarkSectionize from 'remark-sectionize'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkShiki from '../libs/remark-shiki'


export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const postFilenamesSync = () => readdirSync(POSTS_PATH).filter(filename => /\.mdx?$/.test(filename))

export const postSlugsSync = postFilenamesSync().map(filename => filename.replace(/\.mdx?$/, ''))

export const postSlugToPath = (slug: string) => path.join(POSTS_PATH, `${slug}.mdx`)

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
        cover = '',
    }} = matter(file)

    const scope = {
        url: `/post/${slug}`,
        title,
        published,
        language,
        abstract,
        tags,
        cover: (cover && !cover.src) ? {src: cover} : cover,
    } as IPostMeta

    return {
        content,
        scope,
    }
}

export const postsSync = postSlugsSync
    .map(readPost)
    .sort((l, r) => (new Date(r.scope.published).valueOf() - new Date(l.scope.published).valueOf()))

export const tagMapSync = postsSync.reduce((r, post) =>
    Object.assign(r, Object.fromEntries(post.scope.tags.map(tag => [tag, (r[tag] || []).concat(post.scope)]))),
    {} as Record<string, IPostMeta[]>
)

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
                [remarkShiki, {darkTheme: 'github-dark', lightTheme: 'github-light'}],
            ],
            rehypePlugins: [
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
    components.map(component => [component, new RegExp(`mdxType:"${component}"`).test(source)])
)
