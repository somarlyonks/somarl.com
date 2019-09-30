import { h } from 'preact' // lgtm [js/unused-local-variable]
import { DarkSky } from '../icons'


const WeatherSupport = () => (
  <a
    className="support_darksky"
    href="https://darksky.net/poweredby/"
    target="_blank"
    rel="noopener"
  >
    <span className="support__icon_darksky"><DarkSky /></span>
    <span>Powered by Dark Sky</span>
  </a>
)

export default WeatherSupport
