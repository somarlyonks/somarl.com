import { HTTPStatusCodes } from './Adapter'
import { API_SERVER } from './consts'


type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'TRACE' | 'OPTIONS'

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
  return result.status === HTTPStatusCodes.OK ||
         result.status === HTTPStatusCodes.CREATED ||
         result.status === HTTPStatusCodes.ACCEPTED
}


function fetchFactory (method: IMethod) {
  return async (url: S, { body, headers }: {
    body?: BodyInit
    headers?: O
  } = {}) => {
    const options = { body, headers, method }
    if (!url.startsWith('http')) return fetchServerJson(url, options)
    return fetchPublicJson(url, options)
  }
}

export const req = {
  GET: fetchFactory('GET'),
  POST: fetchFactory('POST'),
}

/**
 * fetch cors are supposed to send preflighted OPTIONS request
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
async function fetchServerJson (endpoint: S, { method, body, headers }: {
  method: IMethod
  body?: BodyInit
  headers?: O
}): Promise<ApiResponse> {
  const api = API_SERVER + '/' + endpoint
  const init: RequestInit = {
    method,
    mode: 'cors',
    headers: headers || {
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
    const contentType = resp.headers.get('Content-Type')
    result.body = contentType && contentType.includes('text/html')
      ? await resp.text()
      : await resp.json()
  } else {
    console.warn('Request to', resp.url, 'failed with status code', status)
  }

  return result
}


export async function fetchPublicJson (api: S, { method, body, headers }: {
  method: IMethod
  body?: BodyInit
  headers?: O
}) {
  const init: RequestInit = {
    method,
    mode: 'cors',
    headers: headers || {
      Accept: 'application/json',
    },
  }
  if (body) {
    init.body = body
  }

  return fetch(api, init).then(r => r.json())
}
