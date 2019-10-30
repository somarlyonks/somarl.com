import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

import { Injectable } from '@nestjs/common'

import { SETTINGS } from '../../settings'
import { getDayOfYear, sortdir } from '../../helpers'
import { IBinksRecord } from '../../helpers/Adapter'


const binksDir = path.resolve(SETTINGS.BINKS_DIR)
const readFile = promisify(fs.readFile)

// tslint:disable-next-line: no-var-requires
const binksMeta: IBinksRecord[] = require(path.join(binksDir, '..', 'buffer/COPYRIGHTS.json'))


@Injectable()
export default class BinksService {
  private imgs?: L<S>

  public async getImage () {
    const imgName = await this.getTodayImageName()
    return readFile(path.join(binksDir, imgName))
  }

  public async getMeta () {
    const imgName = await this.getTodayImageName()
    const img = imgName.split('.')[0]

    return binksMeta.find(record => record.image === img) || { copyright: '', image: img }
  }

  private async getTodayImageName () {
    if (!this.imgs) {
      this.imgs = await sortdir(binksDir)
    }
    return this.imgs[getDayOfYear() % this.imgs.length]
  }
}
