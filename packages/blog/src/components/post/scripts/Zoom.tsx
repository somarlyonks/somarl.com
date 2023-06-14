import PostScript from './PostScript'


export default function Zoom () {
    return (
        <PostScript script={`
            import zoom from "https://esm.sh/medium-zoom@1";
            zoom("figure[role='img'] > img", {
                margin: parseFloat(getComputedStyle(document.querySelector('article')).getPropertyValue('font-size')) || 20,
                background: 'var(--color-bg-transparent)',
            });
        `} />
    )
}
