import * as React from 'react'
import WeatherAnimation, { WeatherTypes } from './animation'
import { getWeather } from '../../helpers/Api'
import { weatherTypeMap, HTTPStatusCodes } from '../../helpers/Adapter'
import rgba from '../../helpers/rgba'


export interface IWeatherWidgetProps {
  backgroundColor?: S
}

export interface IWeatherWidgetState {
  type: WeatherTypes,
  toggled: boolean,
}

const getCurrentWeather = () => getWeather(['flags', 'daily', 'hourly'])

export default class WeatherWidget extends React.Component<IWeatherWidgetProps, IWeatherWidgetState> {
  public static defaultProps: IWeatherWidgetProps = {
    backgroundColor: 'rgba(#000, 0.4)',
  }

  public readonly state: IWeatherWidgetState = {
    type: 'cloud',
    toggled: false,
  }

  public componentDidMount () {
    getCurrentWeather().then(resp => {
      // console.info('RRRR', resp) // TODELETE
      if (resp.status !== HTTPStatusCodes.OK) return

      const { currently } = resp.body
      const weatherType = weatherTypeMap[currently!.icon] || weatherTypeMap.fallback
      this.setState({ type: weatherType })
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
          type={this.state.type}
          size="small"
          backgroundColor="transparent"
        />
      </div>
    )
  }
}
