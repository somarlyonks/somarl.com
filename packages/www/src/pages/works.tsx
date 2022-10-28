import {GetStaticProps, InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import Head from '../components/head'
import styles from './works.module.scss'


interface IProps {
    works: Array<{
        name: string
        url: string
        description: string
    }>
}

export default function Works ({works}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head title="Works | Yang" />
            <article className={styles.article}>
                <h1>Works</h1>
                {works.map(work => (
                    <section key={work.name}>
                        <h2><a href={work.url} target="_blank">{work.name}</a></h2>
                        <p>{work.description}</p>
                    </section>
                ))}
            </article>

            <footer>
                <ul>
                    <li><Link href="https://blog.somarl.com">Blogs</Link></li>
                    <li><Link href="https://moment.somarl.com">Moments</Link></li>
                    <li><Link href="/">About</Link></li>
                </ul>
            </footer>
        </>
    )
}


export const getStaticProps: GetStaticProps<IProps, {}> = async () => {
    const works = [
        {name: 'Nippon Colors', url: 'https://qotes.github.io/Colors/', description: '🌸 A set of Japanese traditional colors.'},
        {name: 'CSS ZEN garden', url: 'https://czg.vercel.app', description: '💅 A CSS theming template.'},
        {name: 'Arakneed', url: 'https://github.com/arakneed/crawler', description: '🕷 A common use targeted concurrent crawler.'},
        {name: 'Apple Music Analyser', url: 'https://ama.somarl.com', description: '🎵 A data visualization of personal Apple Music activities.'},
    ]

    return {
        props: {
            works,
        },
    }
}
