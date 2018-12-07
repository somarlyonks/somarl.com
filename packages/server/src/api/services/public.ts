import { Injectable } from '@nestjs/common'

import { SETTINGS } from '../../settings'
import { fetchPublicJson } from '../../helpers'


@Injectable()
export default class PublicApiService {
  public async getIpGeo (): P<{latitude: N, longitude: N}> {
    return fetchPublicJson(`https://ipapi.co/json/`)
  }

  public async getDarkSky (exclude = 'flags') {
    const { latitude, longitude } = await this.getIpGeo()

    const darkSkyApi = `https://api.darksky.net/forecast/${SETTINGS.DARKSKY_SECRET_KEY}/${latitude},${longitude}`
    const units = 'si'
    const queries = `units=${units}&exclude=${exclude}`

    return fetchPublicJson(`${darkSkyApi}?${queries}`)
  }

  public async sinaShortUrl (url: S) {
    const sinaShortUrlApi = 'https://api.weibo.com/2/short_url/shorten.json'
    const queries = `source=${SETTINGS.SINA_APP_KEY}&url_long=${url}`

    return fetchPublicJson(`${sinaShortUrlApi}?${queries}`)
  }
}
