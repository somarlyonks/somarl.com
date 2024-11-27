import {formatDatetime} from '../../libs/i18n'

interface IProps {
    post: IPostMeta
}

export default function PostTime ({post}: IProps) {
    return <time dateTime={post.published}>{formatDatetime(post.published)}</time>
}
