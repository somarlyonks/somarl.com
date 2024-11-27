import type {NextApiRequest, NextApiResponse} from 'next'
import tinify from 'tinify'
import {IncomingForm, Fields, Files} from 'formidable'

import CONFIG from '../../libs/config'
import uuid from '../../libs/uuid'
import HTTPStatusCodes from '../../libs/statusCode'

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {fields: {accesskey}, files: {file}} = await new Promise<{
        fields: Fields
        files: Files
    }>((resolve, reject) => {
        const form = new IncomingForm()
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({fields, files})
        })
    })

    const formAccesskey = Array.isArray(accesskey) ? accesskey[0] : accesskey
    const formFile = Array.isArray(file) ? file[0] : file

    if (!formAccesskey || !formFile) return res.status(HTTPStatusCodes.BAD_REQUEST).end()

    const path = `${CONFIG.S3_BUCKET}/${uuid()}/${formFile.originalFilename}`
    const region = CONFIG.S3_REGION

    tinify.key = CONFIG.TINIFY_API_KEY

    try {
        const r = tinify.fromFile(formFile.filepath).store({
            service: 's3',
            aws_access_key_id: CONFIG.S3_ACCESS_KEY_ID,
            aws_secret_access_key: formAccesskey,
            region,
            path,
        })
        const url = await r.location()
        return res.status(HTTPStatusCodes.OK).json({url})
    } catch (error) {
        console.error(error)
        return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({message: String(error)})
    }
}
