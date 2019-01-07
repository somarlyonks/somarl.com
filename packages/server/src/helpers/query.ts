import mongo from 'mongodb'
import koa from 'koa'


const bsonID = mongo.ObjectID


/**
 * @todo
 */
export const Q = (id: string) => ({ _id: new bsonID(id) })


/**
 * @desc (curried) get mongo db/collection from ctx
 * @example
 *     const _C = __C('myDb')
 *     const C = _C('myCollection')
 */
export const __C = (db: string) => (c: string) => (ctx: koa.Context) => ctx.mongo.db(db).collection(c)
