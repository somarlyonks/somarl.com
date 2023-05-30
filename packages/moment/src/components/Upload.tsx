import {useState, ChangeEventHandler, forwardRef} from 'react'
import type {S3} from 'aws-sdk'

import uuid from '../libs/uuid'
import IconUpload from './icons/Upload'


export interface IProps {
    onStart?: () => void
    onFinish?: () => void
    onUpload: F1<string>
    onError?: F1<Response>
}

export default forwardRef<HTMLInputElement, IProps>(function Upload ({onUpload, onError, onStart, onFinish}, ref) {
    const [uploading, setUploading] = useState(false)
    const handleUpload: ChangeEventHandler<HTMLInputElement> = async event => {
        const [file] = event.target.files || []
        if (!file) return

        setUploading(true)
        if (onStart) onStart()
        try {
            const formData = new FormData()
            const filename = `${uuid()}/${encodeURIComponent(file.name)}`

            const isImage = file.type.startsWith('image/')

            const {url, fields}: Pick<S3.PresignedPost, 'url' | 'fields'> = isImage
                ? {
                    url: '/api/tinify',
                    fields: {
                        accesskey: localStorage.getItem('S3_SECRET_ACCESS_KEY') || '',
                    },
                }
                : await fetch(`/api/s3?key=${filename}&accesskey=${encodeURIComponent(localStorage.getItem('S3_SECRET_ACCESS_KEY') || '')}`).then(r => r.json())

            Object.entries(Object.assign(fields, {file})).forEach(([k, v]) => formData.append(k, v))

            const r = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (r.ok) {
                if (onUpload) onUpload(isImage ? (await r.json()).url : `${url}/${filename}`)
            } else {
                if (onError) onError(r)
                else console.error(r)
            }
        } finally {
            setUploading(false)
            if (onFinish) onFinish()
        }
    }

    return (
        <label role="input">
            <input hidden type="file" onInput={handleUpload} disabled={uploading} ref={ref} />
            {uploading ? <img src="/images/upload.gif" /> : <IconUpload />}
        </label>
    )
})
