import PostImage from './PostImage'
import PostLi from './PostLi'
import PostLink from './PostLink'
import PostUl from './PostUl'

export {default as PostInfo} from './PostInfo'
export {default as PostLayout} from './PostLayout'
export {default as PostTitle} from './PostTitle'

export const postComponents = {
    a: PostLink,
    img: PostImage,
    li: PostLi,
    ul: PostUl,
}
