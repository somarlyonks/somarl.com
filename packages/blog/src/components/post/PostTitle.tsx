import Image from 'next/image'

import useInterSectionObserver from '../../libs/useInterSectionObserver'


interface IProps {
    post: IPostMeta
}

export default function PostTitle ({post}: IProps) {
    const $h1 = useInterSectionObserver(entry => {
        const $nav = document.querySelector<HTMLElement>('#__next > header')
        if ($nav) $nav.style.opacity = String(1 - entry.intersectionRatio)
    }, {
        threshold: Array.from(Array(10 + 1), (_, i) => i / 10),
        rootMargin: '80px',
    })

    const moveInfoSection = () => {
        const $alignSection = document.querySelector('article > section:nth-of-type(2)')
        if (!$alignSection) return

        document.querySelectorAll<HTMLElement>('div[role="contentinfo"] > section').forEach(($contentInfoSection, i) => {
            if (!i) {
                $contentInfoSection.style.marginBottom = `calc(${$alignSection.getBoundingClientRect().top - $contentInfoSection.getBoundingClientRect().bottom}px)`
            }
            $contentInfoSection.style.opacity = '1'
        })
    }

    return (
        <>
            <section role={post.cover ? 'banner' : ''}>
                <h1 ref={$h1}>{post.title}</h1>
                <p>{post.abstract}</p>
                {!!post.cover && (
                    <figure role="img">
                        <Image priority layout="raw" width="1000" height="1000" onLoadingComplete={moveInfoSection} src={post.cover.src} alt="cover" title={post.title} onLoad={moveInfoSection} />
                        {post.cover.work && (
                            <figcaption>
                                {post.cover.author && <span>{post.cover.author}</span>}
                                <span><cite>{post.cover.work}</cite></span>
                                {post.cover.date && <span>{post.cover.date}</span>}
                                {post.cover.material && <span>{post.cover.material}</span>}
                            </figcaption>
                        )}
                    </figure>
                )}
            </section>
            <svg id="tocmark" xmlns="http://www.w3.org/2000/svg"><path /></svg>
        </>
    )
}
