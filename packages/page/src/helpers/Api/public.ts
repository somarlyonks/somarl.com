/**
 * @file seperated api callers
 */

import { req } from '../fetch'


export type PublicApi<R> = F0<Promise<R>>

export const getIpGeo: PublicApi<{
  asn: S                   // "AS4812"
  city: S                  // "Shanghai"
  continent_code: S        // "AS"
  country: S               // "CN"
  country_calling_code: S  // "+86"
  country_name: S          // "China"
  currency: S              // "CNY"
  in_eu: boolean           // false
  ip: S                    // "1.1.1.1"
  languages: S             // "zh-CN,yue,wuu,dta,ug,za"
  latitude: N              // 23.4567
  longitude: N             // 123.4567
  org: S                   // "China Telecom (Group)"
  postal: S                // null
  region: S                // "Shanghai"
  region_code: S           // "SH"
  timezone: S              // "Asia/Shanghai"
  utc_offset: S            // "+0800"
}> = async () => req.GET(`https://ipapi.co/json/`)

/**
 * fast and no limitations, but ip only
 */
export const getIp: PublicApi<{
  ip: S // "1.1.1.1"
}> = async () => req.GET('https://api.ipify.org/?format=json')

export { getBlogs } from '../../plugins/blog' // TODO: @sy remove this
