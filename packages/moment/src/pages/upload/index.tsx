import Head from '../../components/Head'
import Footer from '../../components/Footer'
import styles from './index.module.scss'

import {TextField, SelectField, UploadField} from '../../components/form'

const MOMENT_TYPES = ['quote', 'picture', 'video']

export default function Upload () {
    return (
        <>
            <Head title="Upload | Yang" />
            <article className={styles.article}>
                <h1>Upload</h1>

                <form>
                    <UploadField name="upload" label="upload" onUpload={console.info} />
                    <TextField name="abstract" label="abstract" required />
                    <SelectField name="type" label="type" options={MOMENT_TYPES.map(key => ({key, name: key}))} />
                </form>
            </article>
            <Footer />
        </>
    )
}
