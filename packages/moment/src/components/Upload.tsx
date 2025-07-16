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
    const handleUpload: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const [file] = event.target.files || []
        if (!file) return

        setUploading(true)
        if (onStart) onStart()
        try {
            const filename = `${uuid()}/${encodeURIComponent(file.name)}`
            const {url, fields}: Pick<S3.PresignedPost, 'url' | 'fields'> = await fetch(`/api/s3?key=${filename}&accesskey=${encodeURIComponent(localStorage.getItem('S3_SECRET_ACCESS_KEY') || '')}`).then(r => r.json())
            const formData = new FormData()
            Object.entries(Object.assign(fields, {file})).forEach(([k, v]) => formData.append(k, v))

            const r = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (!r.ok) {
                console.error(r)
                return onError?.(r)
            }

            const filepath = `${url}/${filename}`
            const isImage = file.type.startsWith('image/')

            if (isImage) {
                try {
                    return onUpload?.(await tinyfy({
                        filepath,
                        originalFilename: file.name,
                    }))
                } catch (err) {
                    console.error(err)
                }
            }

            onUpload?.(filepath)
        } finally {
            setUploading(false)
            onFinish?.()
        }
    }

    return (
        <label role="input">
            <input hidden type="file" onInput={handleUpload} disabled={uploading} ref={ref} />
            {uploading ? <img src="/images/upload.gif" /> : <IconUpload />}
        </label>
    )
})

async function tinyfy (file: {
    filepath: string
    originalFilename: string
}) {
    const r = await fetch('/api/tinify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            accesskey: localStorage.getItem('S3_SECRET_ACCESS_KEY') || '',
            file,
        }),
    })

    const {url} = await r.json()

    return url
}
