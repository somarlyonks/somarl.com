/**
 * @desc To keep this most basic configs portable and kinda ... clean,
 *       it should not import other libs or local files.
 */

import './helpers/env'

// tslint:disable: max-line-length
const SERVER_PORT_DEV = 3001
const SERVER_PORT_PROD = 8081
const SERVER_CNAME = 'api'
const FRP_SERVER_CNAME = 'frp'
const SERVER_HOST = 'somarl.com'
const FRP_VHOST_PORT = 7002
const SERVER_PROTOCOL = 'http' // TODO: SSL and http/2
const JWT_SECRET_DEV = 'TBLq4!4.2m'
const ARANGO_PORT_DEFAULT = 8529
const ARANGO_VERSION = '30407'
const DB_DEFAULT = 'test'
const BINKS_DIR = '/home/sy/Dropbox/bing/persistent'
const SINA_APP_KEY = 1524513978 // this doesn't have to be a secret
const QINIU_SCOPE = 'static'
const QINIU_URL = 'https://static.qotes.top/'
const QINIU_ACCESS_KEY = 'R2VkFTTK6oT8CbhadlMT9Fkh6TrEotAfDA_SItaQ'
const MAILER_USERNAME = 'dobby@somarl.com'


// TODO: @sy check env attendance


export default class S {
  public static ENV = process.env.SOMARL_ENV || 'dev'
  public static DEV = S.ENV === 'dev'
  public static SERVER_PORT = process.env.SERVER_PORT || S.ENV === 'prod' ? SERVER_PORT_PROD : process.env.SERVER_PORT_DEV || SERVER_PORT_DEV
  public static SERVER_URI = `${SERVER_PROTOCOL}://${SERVER_CNAME}.${SERVER_HOST}`
  public static FRP_SERVER_URI = `${SERVER_PROTOCOL}://${FRP_SERVER_CNAME}.${SERVER_HOST}:${FRP_VHOST_PORT}`
  public static SERVER_URL = S.SERVER_URI
  public static FRP_SERVER_URL = S.FRP_SERVER_URI

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
    'http://dev.somarl.com',
    'http://www.somarl.com',
    'https://www.somarl.com',
    'http://somarl.com',
    'https://somarl.com',
    'http://192.168.1.119:3001',
  ]

  public static BINKS_DIR = process.env.BINKS_DIR || BINKS_DIR

  public static DARKSKY_SECRET_KEY = process.env.DARKSKY_SECRET_KEY

  public static SINA_APP_KEY = SINA_APP_KEY

  public static QINIU_SCOPE = QINIU_SCOPE
  public static QINIU_URL = QINIU_URL
  public static QINIU_ACCESS_KEY = process.env.QINIU_ACCESS_KEY || QINIU_ACCESS_KEY
  public static QINIU_SECRET_KEY = process.env.QINIU_SECRET_KEY

  public static MAILER_USERNAME = process.env.MAILER_USERNAME || MAILER_USERNAME
  public static MAILER_PASSWORD = process.env.MAILER_PASSWORD

  public static USER_PASSWORD_SALT = process.env.USER_PASSWORD_SALT!
}


export {
  S as SETTINGS
}
