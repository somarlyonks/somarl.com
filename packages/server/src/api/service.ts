import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

import { Injectable } from '@nestjs/common'

import { SETTINGS } from '../settings'
import { fetchPublicJson, getDayOfYear, sortdir } from '../helpers'
import { IBinksRecord } from '../helpers/Adapter'


const binksDir = path.resolve(SETTINGS.BINKS_DIR)
const readFile = promisify(fs.readFile)

// tslint:disable-next-line: no-var-requires
const binksMeta: IBinksRecord[] = require(path.join(binksDir, '..', 'buffer/COPYRIGHTS.json'))

/**
 * TODO: dynamic load imgs
 */
@Injectable()
export class BinksService {
  private imgs?: L<S>

  private async getTodayImageName () {
    if (!this.imgs) {
      this.imgs = await sortdir(binksDir)
    }
    return this.imgs[getDayOfYear() % this.imgs.length]
  }

  public async getImage () {
    const imgName = await this.getTodayImageName()
    return readFile(path.join(binksDir, imgName))
  }

  public async getMeta () {
    const imgName = await this.getTodayImageName()
    const img = imgName.split('.')[0]

    return binksMeta.find(record => record.image === img) || { copyright: '', image: img }
  }
}


@Injectable()
export class PublicApiService {
  public async getIpGeo (): P<{latitude: N, longitude: N}> {
    return fetchPublicJson(`https://ipapi.co/json/`)
  }

  public async getDarkSky (exclude = 'flags') {
    const { latitude, longitude } = await this.getIpGeo()

    const darkSkyApi = `https://api.darksky.net/forecast/${SETTINGS.DARKSKY_SECRETKEY}/${latitude},${longitude}`
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
