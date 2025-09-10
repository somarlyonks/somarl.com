'use client'

import {MDXRemote} from 'next-mdx-remote'
import dynamic from 'next/dynamic'

import useInteractiveToc from '@/libs/useInteractiveToc'
import {postComponents} from '.'
import type {DYNAMIC_COMPONENT_NAMES} from '@/libs/mdx'

const dynamicComponents: Record<C<typeof DYNAMIC_COMPONENT_NAMES>, ANY> = {
    NextJS: dynamic(() => import(`../icons/NextJS`)),
    MDXIcon: dynamic(() => import(`../icons/MDXIcon`)),
    IllustrationFlexWrapItems: dynamic(() => import(`./illustrations/the-way-to-wrap-flex-items-is-grid`)),
    MyBikeTimeline: dynamic(() => import('./illustrations/my-bike')),
    MyCamera: dynamic(() => import('./illustrations/my-camera')),
}

interface IProps {
    compiledSource: string
    extraComponents: Array<C<typeof DYNAMIC_COMPONENT_NAMES>>
    scope: IPostMeta
}

export default function PostContent ({
    compiledSource,
    extraComponents,
    scope,
}: IProps) {
    const components: ANY = Object.assign({},
        postComponents,
        Object.fromEntries(extraComponents.map(name => [name, dynamicComponents[name]])),
    )

    useInteractiveToc(!!extraComponents.length)

    return (
        <MDXRemote
            lazy={!!extraComponents.length}
            compiledSource={compiledSource}
            scope={scope}
            frontmatter={{}}
            components={components}
        />
    )
}
