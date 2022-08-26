import {GetStaticPaths, InferGetStaticPropsType, GetStaticProps} from 'next'
import {MDXRemote} from 'next-mdx-remote'
import type {ParsedUrlQuery} from 'querystring'
import dynamic from 'next/dynamic'
import {getPlaiceholder} from 'plaiceholder'

import {postComponents, PostLayout, PostInfo, PostTitle, PostCollection} from '../../components/post'
import useInteractiveToc from '../../libs/useInteractiveToc'
import {postSlugsSync, serializePost, searchMDXComponentInSource, collectionMapSync} from '../../libs/mdx'


const dynamicComponents = {
    NextJS: dynamic(() => import(`../../components/icons/NextJS`)),
    MDXIcon: dynamic(() => import(`../../components/icons/MDXIcon`)),
}
const DYNAMIC_COMPONENT_NAMES = Array.from(Object.keys(dynamicComponents))

interface IProps {
    slug: string
    compiledSource: string
    scope: IPostMeta
    collection?: IPostMeta[]
    extraComponents: Record<string, boolean>
}

interface IStaticProps extends ParsedUrlQuery {
    slug: string
}

export default function PostPage ({slug, compiledSource, scope, extraComponents, collection}: InferGetStaticPropsType<typeof getStaticProps>) {
    const dynamicComponentNames = DYNAMIC_COMPONENT_NAMES.filter(name => extraComponents[name])
    const components: ANY = Object.assign({},
        postComponents,
        Object.fromEntries(dynamicComponentNames.map(name => [name, dynamicComponents[name]]))
    )

    useInteractiveToc(!!dynamicComponentNames.length)

    return (
        <PostLayout slug={slug} title={scope.title} description={scope.abstract}>
            <article lang={scope.language || 'en'}>
                <PostTitle post={scope} />
                <MDXRemote lazy={!!dynamicComponentNames.length} compiledSource={compiledSource} scope={scope} components={components} />
                {!!(scope.collection && collection) && <PostCollection post={scope} collection={collection} />}
                <PostInfo post={scope} />
            </article>
        </PostLayout>
    )
}

export const getStaticProps: GetStaticProps<IProps, IStaticProps> = async ({params: {slug} = {slug: ''}}) => {
    const {compiledSource, scope} = await serializePost(decodeURIComponent(slug))
    const extraComponents = searchMDXComponentInSource(compiledSource, DYNAMIC_COMPONENT_NAMES)
    const collection = collectionMapSync[scope.collection] || null

    if (scope.cover) {
        const {base64, img} = await getPlaiceholder(scope.cover.src)
        scope.cover = {
            ...scope.cover,
            ...img,
            blurDataURL: base64,
        }
    }

    return {
        props: {
            slug,
            compiledSource,
            scope,
            collection,
            extraComponents,
        },
    }
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async ctx => {
    const slugs: string[] = postSlugsSync
        .map(slug => [slug].concat(slug.includes('/') ? slug.replace(/\//g, encodeURIComponent('/')) : []))
        .reduce((r, c) => r.concat(c))

    return {
        paths: slugs.map(slug => ({
            params: {
                slug,
            },
        })),
        fallback: false,
    }
}
