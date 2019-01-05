import * as React from 'react'
import rgba from '../../helpers/rgba'


export type WeatherTypes = 'breeze' |
  'cloud' |
  'cloud2' |
  'fog' |
  'night' |
  'rain' |
  'snow' |
  'star' |
  'sun' |
  'thunder'

export type WeatherSizes = 'small' | 'normal'

export interface IWeatherAnimationProps {
  type?: WeatherTypes
  size?: WeatherSizes
  backgroundColor?: string
}


export default class WeatherAnimation extends React.Component<IWeatherAnimationProps, {}> {
  public static defaultProps: IWeatherAnimationProps = {
    type: 'sun',
    size: 'normal',
    backgroundColor: 'rgba(#0bf, 0.8)',
  }

  public render () {
    const { type, size, backgroundColor } = this.props

    return (
      <div
        className={`weather-container weather-container_${type} weather-container_${size}`}
        style={{
          backgroundColor: rgba(backgroundColor!),
        }}
      >
        <div className={type} />
      </div>
    )
  }
}
