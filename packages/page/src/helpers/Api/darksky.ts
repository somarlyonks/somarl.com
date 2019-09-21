/**
 * @file seperated api callers
 */

import { req } from '../fetch'
import { IWeatherResponse } from '../Adapter'


/**
 * wrapped DarkSky forecast Api
 */
export const getWeather = async (excludes = ['flags']) =>
  req.GET<IWeatherResponse>(`public/weather/?exclude=${excludes.join(',')}`)
