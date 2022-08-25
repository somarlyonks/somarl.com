interface IProps {
    src: string
    title?: string
    alt?: string
}

export default function PostImage ({src, alt, title}: IProps) {
    return (
        <figure role="img">
            <img src={src} alt={alt} title={title} />
            <figcaption>{title}</figcaption>
        </figure>
    )
}
