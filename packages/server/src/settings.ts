/**
 * @desc To keep this most basic configs portable and kinda ... clean,
 *       it should not import other libs or local files.
 */

import './helpers/env'

// tslint:disable: max-line-length
const KOA_PORT_DEV = 3001
const KOA_PORT_PROD = 8081
const SERVER_CNAME = 'api'
const SERVER_HOST = 'dev.local'
const SERVER_PROTOCOL = 'http' // TODO: SSL and http/2
const JWT_SECRET_DEV = 'TBLq4!4.2m'
const MONGO_PORT_DEFAULT = 27017


class S {
  public static ENV = process.env.SOMARL_ENV || 'dev'
  public static KOA_PORT = process.env.KOA_PORT || S.ENV === 'prod' ? KOA_PORT_PROD : process.env.KOA_PORT_DEV || KOA_PORT_DEV
  public static SERVER_KOA_URI = `${SERVER_PROTOCOL}://${SERVER_CNAME}.${SERVER_HOST}`
  public static SERVER_KOA_URL = S.SERVER_KOA_URI

  public static MONGO_PORT = process.env.MONGO_PORT || MONGO_PORT_DEFAULT
  public static MONGO_HOST = process.env.MONGO_HOST || `localhost`
  public static MONGO_URI = `mongodb://${S.MONGO_HOST}:${S.MONGO_PORT}`
  public static MONGO_OPTIONS = {
    useNewUrlParser: true
  }

  public static JWT_SECRET = process.env.JWT_SECRET || JWT_SECRET_DEV
  public static JWT_OPTIONS = {
    secret: S.JWT_SECRET
  }

  public static DARKSKY_SECRETKEY = process.env.DARKSKY_SECRETKEY || ''
}


export {
  S as SETTINGS
}
