import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import Router from 'koa-router'
import { SETTINGS } from '../settings'
import choice from '../helpers/choice'


const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)


/**
 * @helper https://darksky.net/dev/docs
 * @TODO
 *     save ipGeo to server, read geoInfo from server is preferred
 *       consider that there will be not many users except me
 */
export default function registerBingRoutes (router: Router) {
  router.get('/binks', async ctx => {
    const binksDir = path.resolve(SETTINGS.BINKS_DIR)

    const randomFile = choice(5)

    const imgs = await readdir(binksDir)
    const img = await readFile(path.resolve(binksDir, randomFile(imgs)))

    ctx.type = 'image/jpg'
    ctx.body = img
  })
}
