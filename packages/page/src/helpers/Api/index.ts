/**
 * @file seperated api callers
 */

import { getWeather } from './darksky'
import { getIpGeo, getIp, getBlogs } from './public'
import { getBinks, getBinksColor } from './binks'
import { getQiniuToken } from './qiniu'


export type PublicApi<R> = F0<Promise<R>>

const publicApi = {
  getIpGeo,
  getIp,
  getBlogs,
}

const serverApi = {
  getBinks,
  getBinksColor,
  getWeather,
  getQiniuToken,
}

const Api = {
  public: publicApi,
  ...publicApi,
  server: serverApi,
  ...serverApi,
}

export default Api
