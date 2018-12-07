
// tslint:disable: object-literal-key-quotes

export type WeatherTypes = 'breeze'
                         | 'cloud'
                         | 'cloud2'
                         | 'fog'
                         | 'night'
                         | 'rain'
                         | 'snow'
                         | 'star'
                         | 'sun'
                         | 'thunder'


/**
 * @see https://darksky.net/dev/docs#response-format
 */
export const weatherTypeMap: {
  [key in DarkSkyIcons]: WeatherTypes
} = {
  'clear-day': 'sun',
  'clear-night': 'star',
  'rain': 'rain',
  'sleet': 'rain',
  'snow': 'snow',
  'wind': 'breeze',
  'fog': 'fog',
  'cloudy': 'cloud',
  'partly-cloudy-night': 'night',
  'partly-cloudy-day': 'cloud',
  'fallback': 'cloud',
}

export type DarkSkyIcons = 'clear-day'
                         | 'clear-night'
                         | 'rain'
                         | 'sleet'
                         | 'snow'
                         | 'wind'
                         | 'fog'
                         | 'cloudy'
                         | 'partly-cloudy-day'
                         | 'partly-cloudy-night'
                         | 'fallback' // prepared for other circumstances like hail, thunderstorm, or tornado

/**
 * SI units are as follows:
 * summary: Any summaries containing temperature or snow accumulation units
 *          will have their values in degrees Celsius or in centimeters (respectively).
 * nearestStormDistance: Kilometers.
 * precipIntensity: Millimeters per hour.
 * precipIntensityMax: Millimeters per hour.
 * precipAccumulation: Centimeters.
 * temperature: Degrees Celsius.
 * temperatureMin: Degrees Celsius.
 * temperatureMax: Degrees Celsius.
 * apparentTemperature: Degrees Celsius.
 * dewPoint: Degrees Celsius.windSpeed: Meters per second.
 * windSpeed: Meters per second.
 * pressure: Hectopascals.
 * visibility: Kilometers.
 */
type DarkSkyUnits = 'auto'  // automatically select units based on geographic location
                  | 'ca'    // same as si, except that windSpeed and windGust are in kilometers per hour
                  | 'uk2'   // same as si, except that nearestStormDistance and visibility are in miles,
                            // and windSpeed and windGust in miles per hour
                  | 'us'    // Imperial units (the default)
                  | 'si'    // SI units

interface IDarkSkyDataPointAbstract {
  // The percentage of sky occluded by clouds, between 0 and 1, inclusive.
  cloudCover: N
  dewPoint: N
  // The relative humidity, between 0 and 1, inclusive.
  humidity: N
  // A machine-readable text summary of this data point
  icon: DarkSkyIcons
  // The columnar density of total atmospheric ozone at the given time in Dobson units.
  ozone: N
  // The intensity (in inches of liquid water per hour) of precipitation occurring at the given time.
  // conditional on probability, assuming any precipitation occurs at all
  precipIntensity?: N
  // The standard deviation of the distribution of precipIntensity.
  // Only returned when the full distribution, and not merely the expected mean, can be estimated with accuracy.
  precipIntensityError?: N
  // The maximum value of precipIntensity during a given day.
  precipIntensityMax?: N
  // The UNIX time of when precipIntensityMax occurs during a given day.
  precipIntensityMaxTime?: N
  // The probability of precipitation occurring, between 0 and 1, inclusive.
  precipProbability?: N
  // The type of precipitation occurring at the given time.
  // historical precipType information is usually estimated, rather than observed
  precipType?: 'rain' | 'snow' | 'sleet' // undefined when precipIntensity is zero
  // The sea-level air pressure in millibars.
  pressure: N
  // A human-readable text summary of this data point.
  summary: S // 'Overcast' 'Mostly Cloudy'
  // The UNIX time at which this data point begins.
  // minutely data point are always aligned to the top of the minute,
  // hourly data point objects to the top of the hour,
  // and daily data point objects to midnight of the day,
  // all according to the local time zone.
  time: N
  uvIndex: N
  // The average visibility in kilometers, capped at 10 miles.
  visibility: N
  // The direction that the wind is coming from in degrees, with true north at 0° and progressing clockwise.
  windBearing?: N // undefined when windSpeed is 0
  // The wind gust speed in miles per hour.
  windGust: N
  windSpeed: N
}

interface IDarkSkyDataPointShared extends IDarkSkyDataPointAbstract {
  temperature: N // not on minutely
}

interface IDarkSkyDataPointDailyAndHourlyShared {
  // The amount of snowfall accumulation expected to occur, in inches.
  precipAccumulation?: N // undefined stands for now snowfall expected
}

interface IDarkSkyDataPointCurrently extends IDarkSkyDataPointShared {
  // The apparent (or “feels like”) temperature
  apparentTemperature: N
  // The approximate direction of the nearest storm in degrees, with true north at 0° and progressing clockwise.
  nearestStormBearing?: N // undefined stands for 0
  // The approximate distance to the nearest storm in miles.
  nearestStormDistance: N // A storm distance of 0 doesn’t necessarily refer to a storm at the requested location
                          // but rather a storm in the vicinity of that location.
}

// tslint:disable: no-magic-numbers
interface IDarkSkyDataPointDaily extends
  IDarkSkyDataPointShared,
  IDarkSkyDataPointDailyAndHourlyShared {
  apparentTemperatureHigh: N
  apparentTemperatureHighTime: N
  apparentTemperatureLow: N
  apparentTemperatureLowTime: N
  // The fractional part of the lunation number during the given day.
  moonPhase: 0     // new moon
           //         waxing crescent
           | 0.25  // first quarter moon
           //         waxing gibbous
           | 0.5   // full moon
           //         waning gibbous
           | 0.75  // last quarter moon
           //         waning crescent
  // UNIX time
  sunriseTime: N
  sunsetTime: N
  temperatureHigh: N
  temperatureHighTime: N
  temperatureLow: N
  temperatureLowTime: N
  // The UNIX time of when the maximum uvIndex occurs during a given day.
  uvIndexTime: N
  // The time at which the maximum wind gust speed occurs during the day.
  windGustTime: N
}
// tslint:enable: no-magic-numbers

interface IDarkSkyDataPointHourly extends
  IDarkSkyDataPointShared,
  IDarkSkyDataPointDailyAndHourlyShared {
  // The apparent (or “feels like”) temperature
  apparentTemperature: N
}

interface IDarkSkyDataPointMinutely extends IDarkSkyDataPointAbstract {
  //
}

interface IDarkSkyDataBlock<T> {
  data: L<T>
  icon: DarkSkyIcons
  summary: S
}

interface IDarkSkyAlert {
  description: S
  // The UNIX time at which the alert will expire.
  expire: N
  // An array of strings representing the names of the regions covered by this weather alert.
  regions: L<S>
  //
  severity: 'advisory'  // an individual should be aware of potentially severe weather
          | 'watch'     // an individual should prepare for potentially severe weather
          | 'warning'   // one should take immediate action to protect themselves and others from
                        // potentially severe weather
  // The UNIX time at which the alert was issued.
  time: N
  // A brief description of the alert.
  title: S
  // An HTTP(S) URI that one may refer to for detailed information about the alert.
  uri?: S
}

/**
 * DarkSky forecast Api
 * `https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]`
 * - latitude/longitude: location (in decimal degrees). Positive for north/east, negative for south/west.
 * - time: Either be a UNIX time (that is, seconds since midnight GMT on 1 Jan 1970) or a string formatted as follows:
 *   `[YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone]`.
 *   timezone should either be omitted (to refer to local time for the location being requested),
 *   Z (referring to GMT time), or `+[HH][MM]` or `-[HH][MM]` for an offset from GMT in hours and minutes.
 *   The timezone is only used for determining the time of the request;
 *   the response will always be relative to the local time zone.
 * - query
 *   - exclude currently, minutely, hourly, daily, alerts, flags
 *   - lang
 *   - units @see DarkSkyUnits
 *
 * minutely data block will be omitted, unless requesting a time within an hour of the present.
 * alerts omitted in forcast Api
 */
export interface IWeatherResponse {
  latitude: N
  longitude: N
  // The IANA timezone name for the requested location.
  timezone: S
  // The current timezone offset in hours.
  offset?: N
  currently?: IDarkSkyDataPointCurrently
  minutely?: IDarkSkyDataBlock<IDarkSkyDataPointMinutely>
  hourly?: IDarkSkyDataBlock<IDarkSkyDataPointHourly>
  daily?: IDarkSkyDataBlock<IDarkSkyDataPointDaily>
  alerts?: L<IDarkSkyAlert>
  flags?: {
    // The presence of this property indicates that the Dark Sky data source supports the given location
    'darksky-unavailable'?: S
    // The distance to the nearest weather station that contributed data to this response.
    // Note, however, that many other stations may have also been used;
    // this value is primarily for debugging purposes.
    // This property's value is in miles (if US units are selected) or kilometers (if SI units are selected).
    'darksky-stations': S
    // This property contains an array of IDs for each data source utilized in servicing this request.
    'sources': L<S>
    'units': DarkSkyUnits
  }
}
