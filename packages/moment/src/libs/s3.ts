import {S3} from 'aws-sdk'
import CONFIG from './config'


const s3 = new S3({
    region: CONFIG.S3_REGION,
    credentials: {
        accessKeyId: CONFIG.S3_ACCESS_KEY_ID,
        secretAccessKey: CONFIG.S3_SCERET_ACCESS_KEY,
    },
})

export async function createPresignedPost (Fields?: Record<string, string>) {
    return s3.createPresignedPost({
        Bucket: CONFIG.S3_BUCKET,
        Fields,
        Expires: 60,
        Conditions: [
            // tslint:disable-next-line: no-magic-numbers
            ['content-length-range', 1, 50 << 20], // 1B ~50MB
        ],
    })
}

export async function upload (fileName: string, fileBuffer: Buffer) {
    const params: S3.PutObjectRequest = {
        Bucket: CONFIG.S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
    }

    return new Promise((resolve, reject) => s3.upload(params, (error, data) => {
        if (error) reject(error)
        else resolve(data)
    }))
}
