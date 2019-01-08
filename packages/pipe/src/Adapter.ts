
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
  'fog': 'fog',
  'cloudy': 'cloud',
  'partly-cloudy-day': 'cloud',
  'partly-cloudy-night': 'night',
  'fallback': 'cloud',
}
