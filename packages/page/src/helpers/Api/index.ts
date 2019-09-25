/**
 * @file seperated api callers
 */

import { getWeather } from './darksky'
import { getIpGeo, getIp, getBlogs } from './public'
import * as binksApi from './binks'
import * as qiniuApi from './qiniu'
import * as userApi from './user'

import { isResponseOK } from '../fetch'


const publicApi = {
  getIpGeo,
  getIp,
  getBlogs,
}

const serverApi = {
  getWeather,
  ...binksApi,
  ...qiniuApi,
  ...userApi,
}

const Api = {
  isResponseOK,

  public: publicApi,
  ...publicApi,

  server: serverApi,
  ...serverApi,
}

export default Api
