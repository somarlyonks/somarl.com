import Head from 'src/components/head'
import Link from 'next/link'
import Javascript from 'src/components/icons/js'

export default function Home () {
    return (
        <>
            <Head title="Yang" description="I'm a Web developer at LearningTribes based in Shanghai." />
            <h1>Hi<span className="m-hidden"> there</span> 👋</h1>
            <p>I'm a Web developer at <a href="https://learning-tribes.com" target="_blank">@Learning Tribes</a> based in Shanghai.</p>
            <p>You may call me Yang. Or <ruby>盛<rp>(</rp><rt>shèng</rt><rp>)</rp>阳<rp>(</rp><rt>yáng</rt><rp>)</rp></ruby>, in Chinese.</p>
            <p>I speak 🀄️ Chinese, 🔤 English, 🌸 Japanese, 🐍 Python, <Javascript /> Javascript, 🦀 Rust...</p>
            <p>I compose 🧑🏻‍💻 programs and 🎹 music and have been teaching myself computer science and playing paino for years.</p>

            <footer>
                <ul>
                    <li><Link href="/404/https://blogs.somarl.com">Blogs</Link></li>
                    <li><Link href="/404/appears">Appears</Link></li>
                    <li><Link href="/404/works">Works</Link></li>
                </ul>
            </footer>
        </>
    )
}
