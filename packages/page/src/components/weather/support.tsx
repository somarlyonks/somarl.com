import { h } from 'preact'
import IconDarkSky from '../icons/darksky'


const WeatherSupport = () => (
  <a
    className="support_darksky"
    href="https://darksky.net/poweredby/"
    target="_blank"
    rel="noopener"
  >
    <span className="support__icon_darksky"><IconDarkSky /></span>
    <span>Powered by Dark Sky</span>
  </a>
)

export default WeatherSupport
