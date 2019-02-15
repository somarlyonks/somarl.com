import mongo from 'mongodb'
import koa from 'koa'
import chalk from 'chalk'
import { SETTINGS } from './settings'


export const connectMongo = async (app: koa) =>
  mongo.connect(SETTINGS.MONGO_URI, SETTINGS.MONGO_OPTIONS)
    .then(connection => {
      console.log(chalk.blue(`[mongo] Connected: ${
        (status => chalk[status ? 'green' : 'red'](status.toString()))(connection.isConnected())
        }`))
      app.context.mongo = connection

      return app
    })
    .catch(err => {
      console.log(chalk.red(`[mongo]: ${err}`))
      return app
    })
