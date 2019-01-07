import { WeatherTypes } from 'src/components/weather/animation'

/**
 * @see https://darksky.net/dev/docs#response-format
 */
export const weatherTypeMap: {
  [key: string]: WeatherTypes
} = {
  'clear-day': 'sun',
  'clear-night': 'star',
  'rain': 'rain',
  'snow': 'snow',
  'sleet': 'rain',
  'wind': 'breeze',
  'fog': 'cloud', // TODO: fog
  'cloudy': 'cloud',
  'partly-cloudy-day': 'cloud',
  'partly-cloudy-night': 'star', // TODO: night
  'fallback': 'cloud',
}
