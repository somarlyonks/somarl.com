import Script from 'next/script'


export default function Zoom () {
    return (
        <Script type="module" strategy="lazyOnload" dangerouslySetInnerHTML={{
            __html: `
            import zoom from "https://cdn.skypack.dev/pin/medium-zoom@v1.0.6-cjz5cHtSkbNjacAAqzaz/mode=imports/optimized/medium-zoom.js";
            zoom("figure[role='img'] > img", {
                margin: parseFloat(getComputedStyle(document.querySelector('article')).getPropertyValue('font-size')) || 20,
                background: 'var(--color-bg-transparent)',
            });
        `}} />
    )
}
