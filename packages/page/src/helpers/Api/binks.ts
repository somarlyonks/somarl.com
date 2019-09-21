/**
 * @file seperated api callers
 */

import { req, joinApiUrl } from '../fetch'
import { IBinksRecord } from '../Adapter'
import ColorThief from '../colorthief'


export const getBinks = async () => req.GET<IBinksRecord>('binks')

export const getBinksColor = async () => await new ColorThief().getColorFromUrl(joinApiUrl('binks.jpg'))
