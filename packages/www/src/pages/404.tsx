import Link from 'next/link'
import Head from '../components/head'

import styles from './404.module.scss'


export default function FOF () {

    return (
        <div className={`${styles['f0f-container']} ${styles.flex} ${styles['flex--full']}`}>
            <div className={styles['flex-container']}>
                <Head title="Content Not Found" />

                <div className={`${styles['f0f-container__404']} ${styles.flex}`}>
                    <hgroup data-word="404">404<div className={`${styles['f0f-container__noise']} ${styles.flex}`} /></hgroup>
                </div>
                <div className={styles.flex}><Quote inline quote="远方除了遥远一无所有" author="海子" work="远方" /></div>
                <div className={styles.flex}>
                    <button onClick={navigateBack}>Back</button>
                    <span>/</span>
                    <Link role="button" href="/"><button>Home</button></Link>
                </div>
            </div>
        </div>
    )
}

function navigateBack () {
    if (history.length) return history.back()
    return location.assign('/')
}

function Quote ({
    inline = false,
    quote,
    cite,
    author,
    work,
}: {
    inline?: boolean
    quote: string
    cite?: string
    author?: string
    work?: string
}) {
    if (inline) return (
        <span role="quote"><q cite={cite}>{quote}</q>{!!author && <span>{author}</span>}{!!work && <cite>{work}</cite>}</span>
    )
    return (
        <blockquote cite={cite}>
            <p>{quote}</p>
            {!!author && (
                <footer>
                    <span>{author}</span>
                    {!!work && <cite>{work}</cite>}
                </footer>
            )}
        </blockquote>
    )
}
