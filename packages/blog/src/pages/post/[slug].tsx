import {GetStaticPaths, InferGetStaticPropsType, GetStaticProps} from 'next'
import {MDXRemote} from 'next-mdx-remote'

import {postComponents, PostLayout, PostTime} from '../../components/post'
import useInterSectionObserver from '../../libs/useInterSectionObserver'
import useInteractiveToc from '../../libs/useInteractiveToc'

import type {ParsedUrlQuery} from 'querystring'
import {postFileSlugsSync, serializePost, searchMDXComponentInSource} from '../../libs/mdx'
import dynamic from 'next/dynamic'


const DYNAMIC_COMPONENT_NAMES = ['NextJS', 'MDXIcon']
const dynamicComponents = {
    NextJS: dynamic(() => import(`../../components/icons/NextJS`)),
    MDXIcon: dynamic(() => import(`../../components/icons/MDXIcon`)),
}

interface IProps {
    slug: string
    compiledSource: string
    scope: IPostMeta
    extraComponents: Record<string, boolean>
}

interface IStaticProps extends ParsedUrlQuery {
    slug: string
}

export default function PostPage ({slug, compiledSource, scope, extraComponents}: InferGetStaticPropsType<typeof getStaticProps>) {
    const components = Object.assign({}, postComponents, Object.fromEntries(DYNAMIC_COMPONENT_NAMES
        .filter(name => extraComponents[name])
        .map(name => [name, dynamicComponents[name]]))
    )
    const $h1 = useInterSectionObserver(entry => {
        const $nav = document.querySelector<HTMLElement>('main > header nav')
        if ($nav) $nav.style.opacity = String(1 - entry.intersectionRatio)
    }, {
        threshold: Array.from(Array(10 + 1), (_, i) => i / 10),
    })

    useInteractiveToc()

    return (
        <PostLayout slug={slug} title={scope.title} description={scope.abstract}>
            <article>
                <h1 ref={$h1}>{scope.title}</h1>
                {!!scope.abstract && <p>{scope.abstract}</p>}
                <svg id="tocmark" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                <MDXRemote compiledSource={compiledSource} scope={scope} components={components} />
                <PostTime post={scope} />
            </article>
        </PostLayout>
    )
}

export const getStaticProps: GetStaticProps<IProps, IStaticProps> = async ({params: {slug} = {slug: ''}}) => {
    const {compiledSource, scope} = await serializePost(slug)
    const extraComponents = searchMDXComponentInSource(compiledSource, DYNAMIC_COMPONENT_NAMES)

    return {
        props: {
            slug,
            compiledSource,
            scope,
            extraComponents,
        },
    }
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async ctx => {
    return {
        paths: postFileSlugsSync().map(slug => ({
            params: {
                slug,
            },
        })),
        fallback: false,
    }
}
