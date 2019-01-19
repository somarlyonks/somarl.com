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
 *     The singled binks srv directory instead of the passive synced
 *     Dropbox working directory.
 *     Read meta info from COPYRIGHTS.json
 */
export default function registerBingRoutes (router: Router) {
  router.get('/binks', async ctx => {
    const binksDir = path.resolve(SETTINGS.BINKS_DIR)

    const imgs = await readdir(binksDir)
    const img = await readFile(path.resolve(binksDir, choice(5)(imgs)))

    ctx.type = 'image/jpg'
    ctx.body = img
  })
}
