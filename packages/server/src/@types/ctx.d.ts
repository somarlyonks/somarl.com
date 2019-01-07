import * as Koa from 'koa'
import mongo from 'mongodb'

declare module 'koa' {
    interface BaseContext {
        mongo: mongo.MongoClient
    }
}

import jwt from 'koa-jwt'

declare interface IJwtOptions extends jwt.Options {}
