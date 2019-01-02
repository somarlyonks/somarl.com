import * as React from 'react'
import WeatherAnimation, { WeatherSizes, WeatherTypes } from './animation'


export default class WeatherWidget extends React.Component<{}, {}> {
  public render () {
    return (
      <WeatherAnimation
        type={WeatherTypes.thunder}
        size={WeatherSizes.normal}
        backgroundColor="rgba(#000, 0.2)"
      />
    )
  }
}
