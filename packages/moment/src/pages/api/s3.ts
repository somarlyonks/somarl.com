import type {NextApiRequest, NextApiResponse} from 'next'
import HTTPStatusCodes from '../../libs/statusCode'
import {createPresignedPost} from '../../libs/s3'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const r = await createPresignedPost(
        Object.fromEntries(Object.entries(req.query).map(([k, v]) => [k, v.toString()]))
    )

    return res.status(HTTPStatusCodes.OK).json(r)
}
