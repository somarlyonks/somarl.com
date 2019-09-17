/**
 * @file seperated api callers
 */

import { req, ApiResponse } from '../fetch'
import { IWeatherResponse } from '../Adapter'


/**
 * wrapped DarkSky forecast Api
 */
export const getWeather = async (excludes = ['flags']) =>
  req.GET(`public/weather/?exclude=${excludes.join(',')}`) as P<ApiResponse<IWeatherResponse>>
