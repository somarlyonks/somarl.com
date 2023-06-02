import Link from 'next/link'

import Button from '@/components/Button'
import Flex from '@/components/Flex'
import NavigateBack from '@/components/NavigateBack'

import styles from './not-found.module.scss'

export async function generateMetadata () {
    return {
        title: 'Not Found | Yang',
    }
}


export default function FOF () {

    return (
        <Flex className={styles['f0f-container']} full central>
            <Flex className={styles['f0f-container__404']}>
                <hgroup data-word="404">404<Flex className={styles['f0f-container__noise']} /></hgroup>
            </Flex>
            <Flex><Quote inline quote="远方除了遥远一无所有" author="海子" work="远方" /></Flex>
            <Flex>
                <NavigateBack />
                <span>/</span>
                <Link href="/"><Button borderless label="Home" /></Link>
            </Flex>
        </Flex>
    )
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
