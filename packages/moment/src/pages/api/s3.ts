import type {NextApiRequest, NextApiResponse} from 'next'
import HTTPStatusCodes from '../../libs/statusCode'
import {createPresignedPost} from '../../libs/s3'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.key || !req.query.accesskey) return res.status(HTTPStatusCodes.BAD_REQUEST).end()

    const r = await createPresignedPost(
        {key: req.query.key.toString()},
        req.query.accesskey.toString(),
    )

    return res.status(HTTPStatusCodes.OK).json(r)
}
