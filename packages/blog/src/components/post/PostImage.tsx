import PostFigure from './PostFigure'

interface IProps {
    src?: string
    title?: string
    alt?: string
}

export default function PostImage ({src, alt, title, ...props}: IProps) {
    if (!src) return null
    return <PostFigure src={src} alt={alt} {...props} work={title || alt} />
}
