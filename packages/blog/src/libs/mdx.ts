import {readdirSync, readFileSync} from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
import remarkSlug from 'remark-slug'
import remarkAutolinkHeadings from 'remark-autolink-headings'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkShiki from '@stefanprobst/remark-shiki'
import {getHighlighter} from 'shiki'


export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const postFilenamesSync = () => readdirSync(POSTS_PATH).filter(filename => /\.mdx?$/.test(filename))

export const postFileSlugsSync = () => postFilenamesSync().map(filename => filename.replace(/\.mdx?$/, ''))

export const postSlugToPath = (slug: string) => path.join(POSTS_PATH, `${slug}.mdx`)

export const postFilesSync = postFilenamesSync().map(filename => ({
    slug: filename.replace(/\.mdx?$/, ''),
    path: path.join(POSTS_PATH, filename),
}))

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

export const serializePost = async (slug: string) => {
    const file = readFileSync(postSlugToPath(slug))
    const highlighter = await getHighlighter({theme: 'github-light'})

    const {content, data} = matter(file)

    return serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                remarkSlug,
                [remarkAutolinkHeadings, {
                    content: HastLinkIcon,
                    linkProperties: {
                        ariaHidden: 'true',
                        tabIndex: -1,
                        role: 'button',
                    },
                }],
                remarkToc,
                remarkUnwrapImages,
                // @ts-ignore
                [remarkShiki, {highlighter}],
            ],
            rehypePlugins: [],
        },
        scope: data,
    }) as Promise<MDXRemoteSerializeResult<IPostMeta>>
}

export const searchMDXComponentInSource = (source: string, components: string[]) => Object.fromEntries(
    components.map(component => [component, new RegExp(`mdxType:"${component}"`).test(source)])
)