import {useRef, useEffect} from 'react'
import useInterSectionObserver from '../../libs/useInterSectionObserver'


interface IProps {
    post: IPostMeta
}

export default function PostTitle ({post}: IProps) {
    const $h1 = useInterSectionObserver(entry => {
        const $nav = document.querySelector<HTMLElement>('main > header')
        if ($nav) $nav.style.opacity = String(1 - entry.intersectionRatio)
    }, {
        threshold: Array.from(Array(10 + 1), (_, i) => i / 10),
        rootMargin: '80px',
    })

    const moveInfoSection = () => {
        const $alignSection = document.querySelector('article > section:nth-of-type(2)')
        if (!$alignSection) return

        const $contentInfoSections = document.querySelectorAll<HTMLElement>('div[role="contentinfo"] > section')
        const $contentInfoSection1 = $contentInfoSections[0]
        const $contentInfoSection2 = $contentInfoSections[1]
        if ($contentInfoSection1 && $contentInfoSection2) {
            $contentInfoSection1.style.marginBottom = `calc(${$alignSection.getBoundingClientRect().top - $contentInfoSection1.getBoundingClientRect().bottom}px)`
            $contentInfoSection2.style.opacity = '1'
        }
    }

    const $img = useRef<HTMLImageElement>(null)
    useEffect(() => {
        if (!post.cover) return

        if ($img.current) {
            $img.current.onload = moveInfoSection
            if ($img.current.complete) moveInfoSection()
        } else moveInfoSection()
    }, [])

    return (
        <>
            <section role={post.cover ? 'banner' : ''}>
                <h1 ref={$h1}>{post.title}</h1>
                {!!post.abstract && <p>{post.abstract}</p>}
                {!!post.cover && <figure><img ref={$img} src={post.cover} alt="cover" title={post.title} onLoad={moveInfoSection} /></figure>}
            </section>
            <svg id="tocmark" xmlns="http://www.w3.org/2000/svg"><path /></svg>
        </>
    )
}
