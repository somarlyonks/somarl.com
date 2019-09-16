/**
 * @file seperated api callers
 */

import { fetchServerJson, ApiResponse, joinApiUrl } from '../fetch'
import { IBinksRecord } from '../Adapter'
import ColorThief from '../colorthief'


export const getBinks = async () => fetchServerJson('binks') as Promise<ApiResponse<IBinksRecord>>

export const getBinksColor = async () => await new ColorThief().getColorFromUrl(joinApiUrl('binks.jpg'))
