import PostImage from './PostImage'
import PostLi from './PostLi'
import PostLink from './PostLink'
import PostUl from './PostUl'
import PostFigure from './PostFigure'

export {default as PostInfo} from './PostInfo'
export {default as PostContent} from './PostContent'
export {default as PostTitle} from './PostTitle'
export {default as PostCollection} from './PostCollection'

import PostStyle from './styles/PostStyle'
import ImgShadow from './styles/ImgShadow'
import TableLayoutAuto from './styles/TableLayoutAuto'

import IconAngry from '../icons/Angry'

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
}
