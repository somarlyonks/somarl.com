
import Head from 'next/head'


interface IProps {
    styles: string[]
}

export default function PostStyle ({styles}: IProps) {
    return (
        <Head>
            <style>{styles.map(style => `header + article ${style}`)}</style>
        </Head>
    )
}
