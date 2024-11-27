import type {NextApiRequest, NextApiResponse} from 'next'
import HTTPStatusCodes from '../../libs/statusCode'
import {client} from '../../libs/mongo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {limit = '10'} = req.query

    const connection = await client.connect()
    const collection = client.db('moment').collection<IMomentPost>('moment')
    const documents = await collection.find({}, {}).sort({published: -1}).limit(Number(limit)).toArray()
    await connection.close()

    return res.status(HTTPStatusCodes.OK).json(documents)
}
