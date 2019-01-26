import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import Router from 'koa-router'
import { SETTINGS } from '../settings'
import getDayOfYear from '../helpers/getday'
import sortdir from '../helpers/sortdir'
import { IBinksRecord } from '../helpers/Adapter'


const readFile = promisify(fs.readFile)

const binksDir = path.resolve(SETTINGS.BINKS_DIR)
// tslint:disable-next-line:no-var-requires
const meta: IBinksRecord[] = require(path.join(binksDir, '..', 'buffer/COPYRIGHTS.json'))


/**
 * @desciption response different images everyday
 * @todo move sortdir to daily task
 */
export default function registerBingRoutes (router: Router) {
  router.get('/binks.jpg', async ctx => {
    const imgs = await sortdir(binksDir)
    const img = await readFile(path.join(binksDir, imgs[getDayOfYear() % imgs.length]))

    ctx.type = 'image/jpg'
    ctx.body = img
  })

  router.get('/binks', async ctx => {
    const imgs = await sortdir(binksDir)
    const img = imgs[getDayOfYear() % imgs.length].split('.')[0]

    ctx.body = meta.find(record => record.image === img) || { copyright: '', image: img }
  })
}
