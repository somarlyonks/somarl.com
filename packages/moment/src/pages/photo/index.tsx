import {useCallback, useState, useRef} from 'react'
import type {ChangeEventHandler, MouseEventHandler} from 'react'

import Head from '../../components/Head'
import Footer from '../../components/Footer'
import Satori, {getFileID} from '../../components/Satori'
import {ConfigProvider, ConfigField} from '../../components/Config'
import styles from './photo.module.scss'

export default function Home () {
    const $fileInputRef = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<File[]>([])

    const handleUpload: ChangeEventHandler<HTMLInputElement> = useCallback(async (event) => {
        setFiles(prev => prev.concat(Array.from(event.target.files || []).filter(file => !prev.find(f => getFileID(f) === getFileID(file)))))
    }, [])

    const handleFileClick: MouseEventHandler<HTMLLIElement> = useCallback((e) => {
        const {key} = e.currentTarget.dataset
        setFiles(prev => prev.filter(file => getFileID(file) !== key))
        if ($fileInputRef.current) {
            $fileInputRef.current.value = ''
        }
    }, [])

    return (
        <ConfigProvider>
            <Head title="Moments | Yang" description="I'm a Web developer based in Shanghai." />

            <article className={styles.article}>
                <h1>Moments</h1>

                <ConfigField />

                <fieldset>
                    <legend>select files</legend>

                    <ul className={styles.inputs}>
                        {files.map(file => (
                            <li key={getFileID(file)} data-key={getFileID(file)} onClick={handleFileClick}>
                                <img src={URL.createObjectURL(file)} />
                            </li>
                        ))}

                        <label role="input">
                            <input ref={$fileInputRef} hidden type="file" accept="image/*" multiple onInput={handleUpload} />
                            <span>select files</span>
                        </label>
                    </ul>
                </fieldset>

                <fieldset data-count={files.length}>
                    <legend>outputs</legend>
                    <Satori files={files} />
                </fieldset>
            </article>
            <Footer />
        </ConfigProvider>
    )
}
