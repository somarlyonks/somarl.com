/**
 * @desc To keep this most basic configs portable and kinda ... clean,
 *       it should not import other libs or local files.
 */

import './helpers/env'

// tslint:disable: max-line-length
const SERVER_PORT_DEV = 3001
const SERVER_PORT_PROD = 8081
const SERVER_CNAME = 'api'
const SERVER_HOST = 'dev.local'
const SERVER_PROTOCOL = 'http' // TODO: SSL and http/2
const JWT_SECRET_DEV = 'TBLq4!4.2m'
const ARANGO_PORT_DEFAULT = 8529
const ARANGO_VERSION = '30407'
const DB_DEFAULT = 'test'
const BINKS_DIR = '/home/sy/Dropbox/bing/persistent'
const SINA_APP_KEY = 1524513978 // this doesn't have to be a secret


export default class S {
  public static ENV = process.env.SOMARL_ENV || 'dev'
  public static SERVER_PORT = process.env.SERVER_PORT || S.ENV === 'prod' ? SERVER_PORT_PROD : process.env.SERVER_PORT_DEV || SERVER_PORT_DEV
  public static SERVER_URI = `${SERVER_PROTOCOL}://${SERVER_CNAME}.${SERVER_HOST}`
  public static SERVER_URL = S.SERVER_URI

  public static DB = process.env.DB || DB_DEFAULT
  public static DB_HOST = process.env.DB_HOST || `localhost`

  public static BUILTIN_COLLECTIONS = [
    'recipe',
    'user',
    'image',
  ]

  public static ARANGO_VERSION = parseInt(process.env.ARANGO_VERSION || ARANGO_VERSION, 10)
  public static ARANGO_PORT = process.env.ARANGO_PORT || ARANGO_PORT_DEFAULT
  public static ARANGO_URI = `http://${S.DB_HOST}:${S.ARANGO_PORT}`
  public static ARANGO_USERNAME = process.env.ARANGO_USERNAME
  public static ARANGO_PASSWORD = process.env.ARANGO_PASSWORD

  public static JWT_SECRET = process.env.JWT_SECRET || JWT_SECRET_DEV
  public static JWT_OPTIONS = {
    secret: S.JWT_SECRET,
  }

  public static ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://192.168.1.119:3000',
    'http://www.somarl.com',
    'https://www.somarl.com',
    'http://somarl.com',
    'https://somarl.com',
    'http://192.168.1.119:3001',
  ]

  public static DARKSKY_SECRETKEY = process.env.DARKSKY_SECRETKEY || ''
  public static BINKS_DIR = process.env.BINKS_DIR || BINKS_DIR

  public static SINA_APP_KEY = SINA_APP_KEY
}


export {
  S as SETTINGS
}
