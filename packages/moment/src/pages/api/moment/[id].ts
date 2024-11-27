import type {NextApiRequest, NextApiResponse} from 'next'
import HTTPStatusCodes from '../../../libs/statusCode'
import {client} from '../../../libs/mongo'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const connection = await client.connect()
    const collection = client.db('sample_analytics').collection('accounts')
    const document = await collection.findOne()
    await connection.close()

    return res.status(HTTPStatusCodes.OK).json(document)
}
