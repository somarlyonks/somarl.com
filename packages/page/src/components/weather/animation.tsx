import { h } from 'preact' // lgtm [js/unused-local-variable]
import { WeatherTypes } from 'src/helpers'


interface IWeatherAnimationProps {
  type?: WeatherTypes
}

const WeatherAnimation = ({type = 'sun'}: IWeatherAnimationProps) => (
  <div class="weather-animation">
    <div class={type} />
  </div>
)

export default WeatherAnimation
