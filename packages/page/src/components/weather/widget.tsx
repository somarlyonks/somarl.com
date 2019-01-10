import * as React from 'react'
import WeatherAnimation, { WeatherTypes } from './animation'
import IconRainDrops from '../icons/raindrops'
import IconWind from '../icons/wind'
import IconUmbrella from '../icons/umbrella'
import WeatherSupport from './support'
import { getWeather } from '../../helpers/Api'
import { weatherTypeMap, HTTPStatusCodes } from '../../helpers/Adapter'
import rgba from '../../helpers/rgba'


export interface IWeatherWidgetProps {
  backgroundColor?: S
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
  display: boolean
}


const WeatherInfomations: React.SFC<IWeatherInfomationsProps> = ({display, weatherInfo}) => (
  <div
    style={{display: display ? 'block' : 'none'}}
  >
    <div className="weather-widget__info">
      <div className="weather-widget__info-main">
        <div className="weather-widget__info-main_temperature">{weatherInfo.temperature.toFixed(0) + '°'}</div>
        <div className="weather-widget__info-main_summary">{weatherInfo.summary}</div>
      </div>
      <div className="weather-widget__info-detail flex">
        <div className="weather-widget__info-detail_block">
          <span className="weather-widget__info-detail_icon"><IconRainDrops /></span>
          <span>{(weatherInfo.humidity * 100).toFixed(0) + '%'}</span>
        </div>
        <div className="weather-widget__info-detail_block">
          <span className="weather-widget__info-detail_icon"><IconWind /></span>
          <span>{weatherInfo.windSpeed.toFixed(0) + 'm/s'}</span>
        </div>
        <div className="weather-widget__info-detail_block">
          <span className="weather-widget__info-detail_icon"><IconUmbrella /></span>
          <span>{(weatherInfo.precipProbability * 100).toFixed(0) + '%'}</span>
        </div>
      </div>
    </div>
    <WeatherSupport />
  </div>
)

export default class WeatherWidget extends React.Component<IWeatherWidgetProps, IWeatherWidgetState> {
  public static defaultProps: IWeatherWidgetProps = {
    backgroundColor: 'rgba(#000, 0.4)',
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
    const getCurrentWeather = () => getWeather(['flags', 'daily', 'hourly'])

    getCurrentWeather().then(resp => {
      // console.info('RRRR', resp)
      if (resp.status !== HTTPStatusCodes.OK) return

      const { currently } = resp.body

      const {
        icon,
        apparentTemperature, summary, temperature, humidity, precipProbability, windSpeed,
      } = currently!

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
  }

  public readonly toggle = (event: React.MouseEvent<HTMLElement>) => {
    this.setState(prevState => ({ toggled: !prevState.toggled }))
  }

  public render () {
    const { backgroundColor } = this.props

    return (
      <div
        className={`absolute tl-0 weather-widget ${this.state.toggled ? 'weather-widget_toggled' : ''}`}
        style={{
          backgroundColor: rgba(backgroundColor!),
        }}
        onMouseEnter={this.toggle}
        onMouseLeave={this.toggle}
      >
        <WeatherAnimation
          type={this.state.weatherType}
          size="small"
          backgroundColor="transparent"
        />
        <WeatherInfomations
          display={this.state.toggled}
          weatherInfo={this.state.weatherInfo}
        />
      </div>
    )
  }
}
