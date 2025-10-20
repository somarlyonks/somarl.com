'use client'

import type {ComponentProps} from 'react'
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
    const components: ComponentProps<typeof MDXRemote>['components'] = Object.assign({},
        postComponents,
        Object.fromEntries(extraComponents.map(name => [name, dynamicComponents[name]])),
    )

    const isLazy = !!extraComponents.length
    useInteractiveToc(isLazy)

    return (
        <MDXRemote
            lazy={isLazy}
            compiledSource={compiledSource}
            scope={scope}
            frontmatter={{}}
            components={components}
        />
    )
}
