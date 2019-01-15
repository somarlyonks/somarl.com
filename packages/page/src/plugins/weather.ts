import { Plugin } from './draft'

export default class WeatherPlugin extends Plugin {
  public constructor () {
    super('weather', 'Get more weather infomations')
  }
}
