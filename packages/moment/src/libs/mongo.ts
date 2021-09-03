import {MongoClient} from 'mongodb'

import config from './config'


const uri = `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/blog?retryWrites=true&w=majority`
export const client = new MongoClient(uri)
