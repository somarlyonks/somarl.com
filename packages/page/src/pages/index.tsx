import Link from 'next/link'
import Image from 'next/image'

import Head from 'src/components/head'
import Javascript from 'src/components/icons/js'
import choice from 'src/lib/choice'

import avatar0 from 'public/images/pangurban.jpg'
import avatar1 from 'public/images/boy.jpg'


export default function Works () {
    return (
        <>
            <Head title="Yang" description="I'm a Web developer at LearningTribes based in Shanghai." />
            <article>
                <Avatars />
                <h1>Hi<span className="m-hidden"> there</span> <AH text="👋" /></h1>
                <p>I'm Yang. Or <ruby>盛<rp>(</rp><rt>shèng</rt><rp>)</rp>阳<rp>(</rp><rt>yáng</rt><rp>)</rp></ruby>, in Chinese.</p>
                <p>I'm a Web developer at <a href="https://learning-tribes.com" target="_blank">@Learning Tribes</a> based in Shanghai.</p>
                <p>I speak <AH text="🀄️" /> Chinese, <AH text="🔤" /> English, <AH text="🌸" /> Japanese, <AH text="🐍" /> Python, <Javascript /> Javascript, <AH text="🦀" /> Rust...</p>
                <p>I compose <AH text="💻" /> programs and <AH text="🎹" /> music and have been teaching myself computer science and playing paino for years.</p>
            </article>

            <footer>
                <ul>
                    <li><Link href="https://blog.somarl.com">Blogs</Link></li>
                    <li><Link href="https://moment.somarl.com">Moments</Link></li>
                    <li><Link href="/works">Works</Link></li>
                </ul>
            </footer>
        </>
    )
}

function Avatars () {
    return (
        <aside>
            <Image layout="fill" src={choice([avatar0, avatar1])} />
        </aside>
    )
}

function AH ({text}: {text: string}) {
    return (<span aria-hidden>{text}</span>)
}
