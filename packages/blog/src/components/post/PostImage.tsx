import PostFigure from './PostFigure'

interface IProps {
    src: string
    title?: string
    alt?: string
}

export default function PostImage ({src, alt, title, ...props}: IProps) {
    return <PostFigure src={src} alt={alt} {...props} work={title} />
}
