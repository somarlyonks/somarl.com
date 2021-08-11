import PostImage from './PostImage'
import PostLi from './PostLi'
import PostLink from './PostLink'
import PostPre from './PostPre'
import PostUl from './PostUl'

export {default as PostTime} from './PostTime'
export {default as PostLayout} from './PostLayout'

export const postComponents = {
    a: PostLink,
    img: PostImage,
    li: PostLi,
    pre: PostPre,
    ul: PostUl,
}
