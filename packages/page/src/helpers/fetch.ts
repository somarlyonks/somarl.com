import { HTTPStatusCodes } from './Adapter'
import { API_SERVER } from './consts'
import { HEADERS } from './headers'


type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'TRACE' | 'OPTIONS'

export const joinApiUrl = (endpoint: S) => API_SERVER!.endsWith('/') || endpoint.startsWith('/')
  ? `${API_SERVER}${endpoint}`
  : `${API_SERVER}/${endpoint}`

interface IApiError {
  error?: A // TODO: @sy error specs in pipe
}

export interface IApiResponseSuccess <T = {}> {
  status: HTTPStatusCodes.OK
  body: T & IApiError
}

/**
 * ommit the body to force status checkings
 */
export interface IApiResponseFail {
  status: Exclude<HTTPStatusCodes, HTTPStatusCodes.OK>
  body?: IApiError
}

export type ApiResponse <T = {}> = IApiResponseFail | IApiResponseSuccess<T>

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
    const fetcher = url.startsWith('http') ? fetchPublicJson : fetchServerJson
    const progressThread = window.ProgressThread && new window.ProgressThread()
    try {
      return await fetcher<TResponse>(url, options)
    } catch (error) {
      console.error(error)
      return { status: 0, body: { error: 'NotImplementedErrorInceptor' }} as IApiResponseFail
    } finally {
      if (progressThread) progressThread.done()
    }
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
}) {
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
  if (json) {
    init.body = JSON.stringify(json)
  } else if (body) {
    init.body = body
  }

  const resp = await fetch(api, init)
  const status = resp.status as HTTPStatusCodes

  const result: ApiResponse = { status } as ApiResponse

  if (isResponseOK(result)) {
    const contentType = resp.headers.get('Content-Type')
    result.body = contentType && contentType.includes('text/html')
      ? await resp.text()
      : await resp.json()
  } else {
    console.warn('Request to', resp.url, 'failed with status code', status)
  }

  return result as ApiResponse<TResponse>
}


export async function fetchPublicJson <TResponse = A> (api: S, { method, body, headers, json }: {
  method: IMethod
  body?: BodyInit
  headers?: O
  json?: O
}) {
  const init: RequestInit = {
    method,
    mode: 'cors',
    headers: Object.assign({}, headers || {
      Accept: 'application/json, image/*',
    }, json && {
      'Content-Type': 'application/json;charset=UTF-8',
    }),
  }
  if (json && method === 'POST') {
    init.body = JSON.stringify(json)
  } else if (body) {
    init.body = body
  }

  const resp = await fetch(api, init)
  const status = resp.status as HTTPStatusCodes

  const result: ApiResponse = { status } as ApiResponse

  if (isResponseOK(result)) {
    const contentType = resp.headers.get('Content-Type')
    result.body = contentType && contentType.includes('text/html')
      ? await resp.text()
      : await resp.json()
  } else {
    console.warn('Request to', resp.url, 'failed with status code', status)
  }

  return result as ApiResponse<TResponse>
}
