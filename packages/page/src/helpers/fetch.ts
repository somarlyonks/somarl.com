import { HTTPStatusCodes } from './Adapter'


export const API_SERVER = process.env.REACT_APP_API_SERVER

export const joinApiUrl = (endpoint: S) => API_SERVER!.endsWith('/') || endpoint.startsWith('/')
  ? `${API_SERVER}${endpoint}`
  : `${API_SERVER}/${endpoint}`

export interface IApiResponseSuccess <T = any> {
  status: HTTPStatusCodes.OK
  body: T
}

/**
 * ommit the body to force status checkings
 */
export interface IApiResponseFail {
  status: Exclude<HTTPStatusCodes, HTTPStatusCodes.OK>
}

export type ApiResponse <T = any> = IApiResponseFail | IApiResponseSuccess<T>

/**
 * type guard here, since then it's free to just check like
 * @example
 *   if (resp.status === HTTPStatusCodes.OK) {
 *     console.info(resp.body) // ok
 *   } else {
 *     console.info(resp.body) // tsc warning!
 *   }
 */
function isResponseOK (result: ApiResponse): result is IApiResponseSuccess {
  return result.status === HTTPStatusCodes.OK
}


/**
 * fetch cors are supposed to send preflighted OPTIONS request
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
export async function fetchServerJson (endpoint: string, body?: S): Promise<ApiResponse> {
  const api = API_SERVER + '/' + endpoint
  const init: RequestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
      // 'Content-Type': 'application/json',
      Accept: 'application/json, image/*',
    },
  }
  if (body) {
    init.body = body
  }

  const resp = await fetch(api, init)
  const { status } = resp

  const result: ApiResponse = { status }

  if (isResponseOK(result)) {
    result.body = await resp.json()
  } else {
    console.warn('Request to', resp.url, 'failed with status code', status)
  }

  return result
}


export async function fetchPublicJson (api: S, body?: S) {
  const init: RequestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }
  if (body) {
    init.body = body
  }

  return fetch(api, init).then(r => r.json())
}
