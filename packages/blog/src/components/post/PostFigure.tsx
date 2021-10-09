interface IProps {
    src: string
    work?: string
    alt?: string
    author?: string
    date?: string
    material?: string
}

export default function PostFigure ({src, alt, work, author, date, material}: IProps) {
    return (
        <figure>
            <img src={src} alt={alt || work} title={work} />
            {work && (
                <figcaption>
                    {author && <span>{author}</span>}
                    <span><cite>{work}</cite></span>
                    {date && <span>{date}</span>}
                    {material && <span>{material}</span>}
                </figcaption>
            )}
        </figure>
    )
}
