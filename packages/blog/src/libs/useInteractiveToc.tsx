'use client'

import {useEffect, useState} from 'react'

export default function useInteractiveToc (lazy: boolean) {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!lazy) setReady(true)
        else requestIdleCallback(() => setReady(true))
    }, [])

    useEffect(() => {
        if (!ready) return

        waitForElm('#toc').then(() => {
            const visibleClass = 'visible'
            const $toc = document.getElementById('toc')
            const $tocTree = document.querySelector('#tocmark + ul')
            if (!$toc || !$tocTree) return

            const $svg = document.getElementById('tocmark')
            const $svgPath = $svg?.querySelector<SVGPathElement>('path')
            if (!$svg || !$svgPath) return

            const navItems = [...$tocTree.querySelectorAll('li')].map(($li) => {
                const $anchor = $li.querySelector('a')!
                const targetID = ($anchor.getAttribute('href') || '#').match(/#(.*)/)?.[1] || ''

                return {
                    listItem: $li,
                    $anchor,
                    target: document.getElementById(targetID) || document.getElementById(decodeURIComponent(targetID)),
                    pathStart: Infinity,
                    pathEnd: -Infinity,
                }
            })

            function drawPath () {
                if (!$svgPath) return

                const path: Array<string | number> = []
                let pathIndent: number
                navItems.forEach((item, i) => {
                    const x = item.$anchor.offsetLeft - 5
                    const y = item.$anchor.offsetTop
                    const height = item.$anchor.offsetHeight

                    if (i === 0) {
                        path.push('M', x, y, 'L', x, y + height)
                        item.pathStart = 0
                    } else {
                        if (pathIndent !== x) path.push('L', pathIndent, y)

                        path.push('L', x, y)
                        $svgPath.setAttribute('d', path.join(' '))
                        item.pathStart = $svgPath.getTotalLength() || 0
                        path.push('L', x, y + height)
                    }

                    pathIndent = x
                    $svgPath.setAttribute('d', path.join(' '))
                    item.pathEnd = $svgPath.getTotalLength()
                })
            }

            function syncPath () {
                if (!$tocTree || !$svgPath) return

                const someElsAreVisible = () => $tocTree.querySelectorAll(`.${visibleClass}`).length > 0
                const thisElIsVisible = ($li: HTMLLIElement) => $li.classList.contains(visibleClass)
                const pathLength = $svgPath.getTotalLength()

                const [pathStart, pathEnd] = navItems.reduce(([start, end], item) =>
                    thisElIsVisible(item.listItem)
                        ? [Math.min(item.pathStart, start), Math.max(item.pathEnd, end)]
                        : [start, end]
                , [pathLength, 0],
                )

                if (someElsAreVisible() && pathStart < pathEnd) {
                    $svgPath.style.setProperty('stroke-dashoffset', '1')
                    $svgPath.style.setProperty('stroke-dasharray', `1 ${pathStart} ${pathEnd - pathStart} ${pathLength}`)
                    $svgPath.style.setProperty('opacity', '1')
                } else {
                    $svgPath.style.setProperty('opacity', '0')
                }
            }

            function traceAnchorListItem ($anchor: Element | null) {
                const parent = $anchor?.parentElement
                if (!parent || parent.tagName === 'LI') return parent
                return parent.parentElement
            }

            const observer = new IntersectionObserver(entries => entries.forEach((entry) => {
                const id = entry.target.querySelector('[id]')?.getAttribute('id')
                const $anchor = document.querySelector(`li a[href$="#${encodeURIComponent(String(id))}"]`)

                const $li = traceAnchorListItem($anchor)
                if (!$li) return

                if (entry.isIntersecting) $li.classList.add(visibleClass)
                else $li.classList.remove(visibleClass)

                syncPath()
            }), {
                rootMargin: '-100px 0px 0px 0px',
            })

            drawPath()

            const elementsToObserve = document.querySelectorAll('article section > [id]')
            elementsToObserve.forEach(el => observer.observe(el.parentElement || el))

            return () => observer.disconnect()
        })
    }, [ready])
}

function waitForElm (selector: string) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect()
                resolve(document.querySelector(selector))
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}
