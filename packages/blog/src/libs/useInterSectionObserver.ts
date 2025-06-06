'use client'

import {useRef, useEffect} from 'react'

export default function useInterSectionObserver (
    cb: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit,
) {
    // eslint-disable-next-line eslint-plugin-no-null/no-null
    const $el = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (!window.IntersectionObserver) return

        const observer = new IntersectionObserver(entries => entries.forEach(cb), options)
        if ($el.current) observer.observe($el.current)

        return () => observer.disconnect()
    }, [])

    return $el
}
