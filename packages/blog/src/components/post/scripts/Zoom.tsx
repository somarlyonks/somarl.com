import PostScript from './PostScript'

export default function Zoom () {
    return (
        <PostScript id="medium-zoom-module">
            {/* js */`
                import zoom from "https://esm.sh/medium-zoom@1";

                const selector = "figure[role='img'] > img:not(.medium-zoom-image)"
                function addZoom(el) {
                    zoom(el, {
                        margin: parseFloat(getComputedStyle(document.querySelector('article')).getPropertyValue('font-size')) || 20,
                        background: 'var(--color-bg-transparent)',
                    })
                }
                addZoom(selector)

                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector)) addZoom(selector)
                })

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                })

                window.addEventListener('beforeunload', () => observer.disconnect())
            `}
        </PostScript>
    )
}
