import { h, Component } from 'preact'
import WeatherAnimation from './animation'


export default class WeatherWidget extends Component<{}, {}> {
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
