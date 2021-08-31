import {useState} from 'react'

import Copy from '@csszen/components.copy'
import Flex from '@csszen/components.flexmini'
import Head from '../../components/Head'
import Footer from '../../components/Footer'
import Uploader from '../../components/Upload'
import styles from './index.module.scss'


export default function Upload () {
    const [src, setSrc] = useState('')

    const handleStartUpload = () => setSrc('')
    const handleUpload = (url: string) => setSrc(url)

    return (
        <>
            <Head title="Upload | Yang" description="I'm a Web developer at LearningTribes based in Shanghai." />
            <article className={styles.article}>
                <h1>Upload</h1>

                <Flex className={styles.main} verticle grow>
                    <Uploader onUpload={handleUpload} onStart={handleStartUpload} />
                </Flex>

                {!!src && (
                    <Flex className={styles.footer}>
                        <a href={src} target="_blank">{src}</a>
                        <Copy content={src} />
                    </Flex>
                )}
            </article>
            <Footer />
        </>
    )
}
