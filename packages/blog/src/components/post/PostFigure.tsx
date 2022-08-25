import Image from 'next/image'


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
        <figure role="img">
            <Image priority layout="raw" width="1000" height="1000" src={src} alt={alt} title={work} />
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
