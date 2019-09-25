import { HTTPStatusCodes } from './Adapter'
import { API_SERVER } from './consts'
import { HEADERS } from './headers'


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
export function isResponseOK (result: ApiResponse): result is IApiResponseSuccess {
  return result.status === HTTPStatusCodes.OK ||
         result.status === HTTPStatusCodes.CREATED ||
         result.status === HTTPStatusCodes.ACCEPTED
}


function fetchFactory (method: IMethod) {
  return async <TResponse = A> (url: S, { body, headers, json }: {
    body?: BodyInit
    headers?: O
    json?: O
  } = {}) => {
    const options = { body, headers, method, json }
    if (!url.startsWith('http')) return fetchServerJson<TResponse>(url, options)
    return fetchPublicJson<TResponse>(url, options)
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
async function fetchServerJson <TResponse = A> (endpoint: S, { method, body, headers, json }: {
  method: IMethod
  body?: BodyInit
  headers?: O
  json?: O
}): Promise<ApiResponse<TResponse>> {
  const api = API_SERVER + '/' + endpoint
  const init: RequestInit = {
    method,
    mode: 'cors',
    headers: Object.assign({},
      HEADERS.auth(),
      headers || {
        Accept: 'application/json, image/*',
      },
      json && {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    ),
  }
  if (body) {
    init.body = json ? JSON.stringify(json) : body
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


export async function fetchPublicJson <TResponse = A> (api: S, { method, body, headers, json }: {
  method: IMethod
  body?: BodyInit
  headers?: O
  json?: O
}): Promise<ApiResponse<TResponse>> {
  const init: RequestInit = {
    method,
    mode: 'cors',
    headers: Object.assign({}, headers || {
      Accept: 'application/json, image/*',
    }, json && {
      'Content-Type': 'application/json;charset=UTF-8',
    }),
  }
  if (body) {
    init.body = json ? JSON.stringify(json) : body
  }

  return fetch(api, init).then(r => r.json())
}
