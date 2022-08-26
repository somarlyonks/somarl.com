import PostFigure from './PostFigure'

interface IProps {
    src: string
    title?: string
    alt?: string
}

export default function PostImage ({src, alt, title}: IProps) {
    return <PostFigure src={src} alt={alt} work={title} />
}
