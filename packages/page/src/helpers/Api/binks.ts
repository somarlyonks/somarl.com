/**
 * @file seperated api callers
 */

import { req, ApiResponse, joinApiUrl } from '../fetch'
import { IBinksRecord } from '../Adapter'
import ColorThief from '../colorthief'


export const getBinks = async () => req.GET('binks') as Promise<ApiResponse<IBinksRecord>>

export const getBinksColor = async () => await new ColorThief().getColorFromUrl(joinApiUrl('binks.jpg'))
