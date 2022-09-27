import PostScript from './PostScript'


export default function Zoom () {
    return (
        <PostScript script={`
            import zoom from "https://cdn.skypack.dev/pin/medium-zoom@v1.0.6-cjz5cHtSkbNjacAAqzaz/mode=imports/optimized/medium-zoom.js";
            zoom("figure[role='img'] > img", {
                margin: parseFloat(getComputedStyle(document.querySelector('article')).getPropertyValue('font-size')) || 20,
                background: 'var(--color-bg-transparent)',
            });
        `} />
    )
}
