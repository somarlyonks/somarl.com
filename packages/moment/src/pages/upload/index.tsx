import Head from '../../components/Head'
import Footer from '../../components/Footer'
import styles from './index.module.scss'

import {TextField, SelectField, UploadField} from '../../components/form'


const MOMENT_TYPES = ['quote', 'picture', 'video']

export default function Upload () {
    return (
        <>
            <Head title="Upload | Yang" description="I'm a Web developer based in Shanghai." />
            <article className={styles.article}>
                <h1>Upload</h1>

                <form>
                    <TextField name="abstract" label="abstract" required />
                    <SelectField name="type" label="type" options={MOMENT_TYPES.map(key => ({key, name: key}))} />
                    <UploadField name="upload" label="upload" onUpload={console.info} />
                </form>
            </article>
            <Footer />
        </>
    )
}
