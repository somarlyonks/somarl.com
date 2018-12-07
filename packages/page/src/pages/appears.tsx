import Link from 'next/link'
import Head from 'src/components/head'


export default function Appears () {
    return (
        <>
            <Head title="Appears | Yang" />
            <article>
                <h1>Appears</h1>
            </article>

            <footer>
                <ul>
                    <li><Link href="https://blogs.somarl.com">Blogs</Link></li>
                    <li><Link href="/">About</Link></li>
                    <li><Link href="/works">Works</Link></li>
                </ul>
            </footer>
        </>
    )
}
