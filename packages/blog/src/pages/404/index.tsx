import Button from '../../components/Button'
import Flex from '../../components/Flex'
import Head from '../../components/Head'

import styles from './index.module.scss'


export default function FOF () {

    return (
        <Flex className={styles['f0f-container']} full central>
            <Head title="Content Not Found" />

            <Flex className={styles['f0f-container__404']}>
                <hgroup data-word="404">404<Flex className={styles['f0f-container__noise']} /></hgroup>
            </Flex>
            <Flex><Quote inline quote="远方除了遥远一无所有" author="海子" work="远方" /></Flex>
            <Flex>
                <Button borderless label="Back" onClick={navigateBack} />
                <span>/</span>
                <a href="/"><Button borderless label="Home" /></a>
            </Flex>
        </Flex>
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
        <span role="quote"><q cite={cite}>{quote}</q>{author ? <span>{author}</span> : null}{work ? <cite>{work}</cite> : null}</span>
    )
    return (
        <blockquote cite={cite}>
            <p>{quote}</p>
            {author ? (
                <footer>
                    <span>{author}</span>
                    {work ? <cite>{work}</cite> : null}
                </footer>
            ) : null}
        </blockquote>
    )
}
