import Script from 'next/script'


interface IProps {
    script: string
}

export default function PostScript ({script}: IProps) {
    return (
        <Script type="module" strategy="lazyOnload" dangerouslySetInnerHTML={{__html: script}} />
    )
}
