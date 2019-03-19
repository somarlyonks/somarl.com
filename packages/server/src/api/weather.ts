import Router from 'koa-router'
import { fetchPublicJson } from '../helpers/fetch'
import { SETTINGS } from '../settings'


async function getIpGeo (ctx?: any): Promise<{latitude: N, longitude: N}> {
  return await fetchPublicJson(`https://ipapi.co/json/`).then(r => r.json())
}

/**
 * @helper https://darksky.net/dev/docs
 * @TODO
 *     save ipGeo to server, read geoInfo from server is preferred
 *       consider that there will be not many users except me
 */
export default function registerWeatherRoutes (router: Router) {
  router.get('/weather', async ctx => {
    const ipGeo = await getIpGeo()
    const { latitude, longitude } = ipGeo

    const darkSkyApi = `https://api.darksky.net/forecast/${SETTINGS.DARKSKY_SECRETKEY}/${latitude},${longitude}`

    const exclude = ctx.request.query.exclude || 'flags'
    const units = 'si'

    const queries = `units=${units}&exclude=${exclude}`

    ctx.body = await fetchPublicJson(`${darkSkyApi}?${queries}`).then(r => r.json())
  })
}
