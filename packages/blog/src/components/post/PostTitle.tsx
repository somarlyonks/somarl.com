import useInterSectionObserver from '../../libs/useInterSectionObserver'


interface IProps {
    post: IPostMeta
}

export default function PostTitle ({post}: IProps) {
    const $h1 = useInterSectionObserver(entry => {
        const $nav = document.querySelector<HTMLElement>('main > header nav')
        if ($nav) $nav.style.opacity = String(1 - entry.intersectionRatio)
    }, {
        threshold: Array.from(Array(10 + 1), (_, i) => i / 10),
    })

    return (
        <>
            <h1 ref={$h1}>{post.title}</h1>
            {!!post.abstract && <p>{post.abstract}</p>}
            <svg id="tocmark" xmlns="http://www.w3.org/2000/svg"><path /></svg>
        </>
    )
}
