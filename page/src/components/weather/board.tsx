import * as React from 'react'
import WeatherAnimation from './animation'


export default class WeatherWidget extends React.Component<{}, {}> {
  public render () {
    return (
      <WeatherAnimation
        type="thunder"
        size="normal"
        backgroundColor="rgba(#000, 0.2)"
      />
    )
  }
}
