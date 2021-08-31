import {useState, ChangeEventHandler} from 'react'
import type {S3} from 'aws-sdk'

import uuid from '../libs/uuid'
import IconUpload from './icons/Upload'


interface IProps {
    onStart?: () => void
    onFinish?: () => void
    onUpload: F1<string>
    onError?: F1<Response>
}

export default function Upload ({onUpload, onError, onStart, onFinish}: IProps) {
    const [uploading, setUploading] = useState(false)
    const handleUpload: ChangeEventHandler<HTMLInputElement> = async event => {
        const [file] = event.target.files || []
        if (!file) return

        setUploading(true)
        if (onStart) onStart()
        try {
            const filename = `${uuid()}/${encodeURIComponent(file.name)}`
            const r = await fetch(`/api/s3?key=${filename}&accesskey=${encodeURIComponent(localStorage.getItem('S3_SECRET_ACCESS_KEY') || '')}`)
            const {url, fields}: S3.PresignedPost = await r.json()
            const formData = new FormData()
            Object.entries(Object.assign(fields, {file})).forEach(([k, v]) => formData.append(k, v))

            const r2 = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (r2.ok) {
                if (onUpload) onUpload(`${url}/${filename}`)
            } else {
                if (onError) onError(r2)
                else console.error(r2)
            }
        } finally {
            setUploading(false)
            if (onFinish) onFinish()
        }
    }

    return (
        <label role="input">
            <input hidden type="file" onInput={handleUpload} disabled={uploading} />
            {uploading ? <img src="/images/upload.gif" /> : <IconUpload />}
        </label>
    )
}
