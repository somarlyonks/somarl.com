import {ChangeEventHandler, useState} from 'react'
import type {S3} from 'aws-sdk'

import Copy from '@csszen/components.copy'
import Head from '../../components/Head'
import Footer from '../../components/Footer'
import uuid from '../../libs/uuid'


export default function Upload () {
    const [src, setSrc] = useState('')

    const handleUpload: ChangeEventHandler<HTMLInputElement> = async event => {
        const [file] = event.target.files || []
        if (!file) return
        const filename = `${uuid()}-${encodeURIComponent(file.name)}`
        const r = await fetch(`/api/s3?key=${filename}`)
        const {url, fields}: S3.PresignedPost = await r.json()
        const formData = new FormData()
        Object.entries(Object.assign(fields, {file})).forEach(([k, v]) => formData.append(k, v))
        const r2 = await fetch(url, {
            method: 'POST',
            body: formData,
        })
        if (r2.ok) setSrc(`${url}/${filename}`)
        else console.error(r2)
    }


    return (
        <>
            <Head title="Upload | Yang" description="I'm a Web developer at LearningTribes based in Shanghai." />
            <article>
                <h1>Upload</h1>
                <input type="file" onChange={handleUpload} />
                {src && (
                    <div>{src} <Copy content={src} /></div>
                )}
            </article>
            <Footer />
        </>
    )
}
