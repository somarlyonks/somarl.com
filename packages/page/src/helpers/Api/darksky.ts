/**
 * @file seperated api callers
 */

import { fetchServerJson, ApiResponse } from '../fetch'
import { IWeatherResponse } from '../Adapter'


/**
 * wrapped DarkSky forecast Api
 */
export const getWeather = async (excludes = ['flags']) =>
  fetchServerJson(`public/weather/?exclude=${excludes.join(',')}`) as P<ApiResponse<IWeatherResponse>>
