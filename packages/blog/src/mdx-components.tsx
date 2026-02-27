import type {MDXComponents} from 'mdx/types'

import PostImage from './components/post/PostImage'
import PostLi from './components/post/PostLi'
import PostLink from './components/post/PostLink'
import PostUl from './components/post/PostUl'
import PostFigure from './components/post/PostFigure'

import PostStyle from './components/post/styles/PostStyle'
import ImgShadow from './components/post/styles/ImgShadow'
import TableLayoutAuto from './components/post/styles/TableLayoutAuto'

import IconAngry from './components/icons/Angry'

export const postComponents = {
    a: PostLink,
    img: PostImage,
    li: PostLi,
    ul: PostUl,
    PostStyle,
    PostFigure,
    ImgShadow,
    TableLayoutAuto,
    IconAngry,
} satisfies MDXComponents

export function useMDXComponents (): MDXComponents {
    return postComponents
}
