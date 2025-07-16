import type {NextApiRequest, NextApiResponse} from 'next'
import tinify from 'tinify'

import CONFIG from '../../libs/config'
import uuid from '../../libs/uuid'
import HTTPStatusCodes from '../../libs/statusCode'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {accesskey, file} = req.body

    const formAccesskey = Array.isArray(accesskey) ? accesskey[0] : accesskey

    if (!formAccesskey || !file) return res.status(HTTPStatusCodes.BAD_REQUEST).json({msg: 'bad request'})

    tinify.key = CONFIG.TINIFY_API_KEY

    try {
        const r = tinify.fromUrl(file.filepath).store({
            service: 's3',
            aws_access_key_id: CONFIG.S3_ACCESS_KEY_ID,
            aws_secret_access_key: formAccesskey,
            region: CONFIG.S3_REGION,
            path: `${CONFIG.S3_BUCKET}/${uuid()}/${file.originalFilename}`,
        })
        const url = await r.location()
        return res.status(HTTPStatusCodes.OK).json({url})
    } catch (error) {
        console.error(error)
        return res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).json({message: String(error)})
    }
}
