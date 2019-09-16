/**
 * @file seperated api callers
 */

import { getWeather } from './darksky'

import { getIpGeo, getIp, getBlogs } from './public'

import { getBinks, getBinksColor } from './binks'


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
}

const Api = {
  public: publicApi,
  ...publicApi,
  server: serverApi,
  ...serverApi,
}

window.Api = Api

export default Api
