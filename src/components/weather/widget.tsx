import * as React from 'react'
import WeatherAnimation, { WeatherTypes } from './animation'
import { getWeather } from '../../helpers/Api'
import { weatherTypeMap } from '../../helpers/Adapter'


export interface IWeatherWidgetProps {
  backgroundColor?: S
}

export interface IWeatherWidgetState {
  type: WeatherTypes
}

export default class WeatherWidget extends React.Component<IWeatherWidgetProps, IWeatherWidgetState> {
  public static defaultProps: IWeatherWidgetProps = {
    backgroundColor: 'rgba(#000, 0.4)',
  }

  public readonly state: IWeatherWidgetState = {
    type: 'cloud',
  }

  public componentDidMount () {
    getWeather().then(resp => {
      console.info('dddddd', resp) // TODELETE
      const weatherType = weatherTypeMap[resp.icon] || weatherTypeMap.fallback
      this.setState({ type: weatherType })
    }).catch(console.warn)
  }

  public render () {
    const { backgroundColor } = this.props

    return (
      <WeatherAnimation
        type={this.state.type}
        size="small"
        backgroundColor={backgroundColor}
      />
    )
  }
}
