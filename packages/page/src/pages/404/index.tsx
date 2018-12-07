
import Link from 'next/link'
import Flex from 'src/components/flex'
import Head from 'src/components/head'
import Quote from 'src/components/quote'
import Button from 'src/components/button'

import styles from './404.module.scss'


export default function CountentNotFound () {

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
                <Link href="/"><Button borderless label="Home" /></Link>
            </Flex>
        </Flex>
    )
}

const navigateBack = () => {
    if (history.length) return history.back()
    return location.assign('/')
}
