import * as React from 'react'
import rgba from 'src/helpers/rgba'


export enum WeatherTypes {
  'breeze' = 'breeze',
  'cloud' = 'cloud',
  'cloud2' = 'cloud2',
  'rain' = 'rain',
  'snow' = 'snow',
  'star' = 'star',
  'sun' = 'sun',
  'thunder' = 'thunder',
}

export enum WeatherSizes {
  'small' = '50px',
  'normal' = '200px',
}

export interface IWeatherAnimationProps {
  type?: WeatherTypes
  size?: WeatherSizes
  backgroundColor?: string
}


export default class WeatherAnimation extends React.Component<IWeatherAnimationProps, {}> {
  public static defaultProps: IWeatherAnimationProps = {
    type: WeatherTypes.sun,
    size: WeatherSizes.normal,
    backgroundColor: 'rgba(#0bf, 0.8)',
  }

  public render () {
    const { type, size, backgroundColor } = this.props
    return (
      <div
        className={`weather-container weather-container_${type}`}
        style={{
          fontSize: size,
          width: size,
          height: size,
          backgroundColor: rgba(backgroundColor!),
        }}
      >
        <div className={type} />
      </div>
    )
  }
}
