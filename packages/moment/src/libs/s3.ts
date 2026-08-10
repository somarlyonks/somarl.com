import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import {createPresignedPost as createS3PresignedPost} from '@aws-sdk/s3-presigned-post'
import CONFIG from './config'

function getClient (accessKey?: string) {
    const secretAccessKey = CONFIG.S3_SECRET_ACCESS_KEY || accessKey
    if (!secretAccessKey) return

    return new S3Client({
        region: CONFIG.S3_REGION,
        credentials: {
            accessKeyId: CONFIG.S3_ACCESS_KEY_ID,
            secretAccessKey,
        },
    })
}

export async function createPresignedPost (key: string, accessKey?: string) {
    const client = getClient(accessKey)
    if (!client) return

    return createS3PresignedPost(client, {
        Bucket: CONFIG.S3_BUCKET,
        Key: key ?? '',
        Expires: 60,
        Conditions: [
            ['content-length-range', 1, 50 << 20], // 1B ~50MB
        ],
    })
}

export async function upload (fileName: string, fileBuffer: Buffer, accessKey?: string) {
    const client = getClient(accessKey)
    if (!client) return

    return client.send(new PutObjectCommand({
        Bucket: CONFIG.S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
    }))
}
