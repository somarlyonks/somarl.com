import { h, Component } from 'preact' // lgtm [js/unused-local-variable]

import WeatherAnimation from './animation'
import WeatherSupport from './support'
import * as Icons from '../icons'
import Api from '../../helpers/Api'
import { weatherTypeMap, WeatherTypes } from '../../helpers/Adapter'


export interface IWeatherWidgetProps {
}

interface IWidgetWeatherInfo {
  summary: S
  apparentTemperature: N
  temperature: N
  humidity: N
  precipProbability: N
  windSpeed: N
}

export interface IWeatherWidgetState {
  toggled: boolean
  weatherType: WeatherTypes
  weatherInfo: IWidgetWeatherInfo
}

interface IWeatherInfomationsProps {
  weatherInfo: IWidgetWeatherInfo
}


const WeatherInfomations = ({weatherInfo}: IWeatherInfomationsProps) => (
  <div class="weather-widget__info-container">
    <div class="weather-widget__info">
      <div class="weather-widget__info-main">
        <div class="weather-widget__info-main_temperature">{weatherInfo.temperature.toFixed(0) + '°'}</div>
        <div class="weather-widget__info-main_summary">{weatherInfo.summary}</div>
      </div>
      <div class="weather-widget__info-detail flex">
        <div class="weather-widget__info-detail_block">
          <span class="weather-widget__info-detail_icon"><Icons.RainDrops /></span>
          <span>{(weatherInfo.humidity * 100).toFixed(0) + '%'}</span>
        </div>
        <div class="weather-widget__info-detail_block">
          <span class="weather-widget__info-detail_icon"><Icons.Wind /></span>
          <span>{weatherInfo.windSpeed.toFixed(0) + 'm/s'}</span>
        </div>
        <div class="weather-widget__info-detail_block">
          <span class="weather-widget__info-detail_icon"><Icons.Umbrella /></span>
          <span>{(weatherInfo.precipProbability * 100).toFixed(0) + '%'}</span>
        </div>
      </div>
    </div>
    <WeatherSupport />
  </div>
)

export default class WeatherWidget extends Component<IWeatherWidgetProps, IWeatherWidgetState> {
  public timer?: NodeJS.Timeout
  public static defaultProps: IWeatherWidgetProps = {
  }

  public readonly state: IWeatherWidgetState = {
    toggled: false,
    weatherType: 'cloud',
    weatherInfo: {
      summary: 'Cloudy',
      apparentTemperature: 14,
      temperature: 15,
      humidity: 0.8,
      precipProbability: 0.1,
      windSpeed: 2,
    },
  }

  public componentDidMount () {
    const getCurrentWeather = () => Api.getWeather(['flags', 'daily', 'hourly'])
    const updateWeather = () => getCurrentWeather().then(resp => {
      if (!Api.isResponseOK(resp) || !resp.body.currently) return

      const {
        icon,
        apparentTemperature, summary, temperature, humidity, precipProbability, windSpeed,
      } = resp.body.currently

      const weatherType = weatherTypeMap[icon] || weatherTypeMap.fallback
      const weatherInfo: IWidgetWeatherInfo = {
        summary,
        apparentTemperature,
        temperature,
        humidity,
        precipProbability: precipProbability || 0,
        windSpeed,
      }

      this.setState({ weatherType, weatherInfo })
    }).catch(console.warn)

    updateWeather()
    this.timer = setInterval(updateWeather, 1000 * 60 * 5)
  }

  public componentWillUnmount () {
    if (this.timer) clearInterval(this.timer)
  }

  public render () {
    return (
      <div class="relative weather-widget">
        <WeatherAnimation type={this.state.weatherType} />
        <WeatherInfomations weatherInfo={this.state.weatherInfo} />
      </div>
    )
  }
}
