import {useRef, useEffect} from 'react'


export default function useInterSectionObserver (
    cb: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
) {
    const $el = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (!window.IntersectionObserver) return

        const h1Observer = new IntersectionObserver(entries => entries.forEach(cb), options)
        if ($el.current) h1Observer.observe($el.current)

        return () => h1Observer.disconnect()
    }, [])

    return $el
}
