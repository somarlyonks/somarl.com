import { HTTPStatusCodes } from './Adapter'

const API_SERVER = process.env.REACT_APP_API_SERVER

export interface IApiResponseSuccess <T = any> {
  status: HTTPStatusCodes.OK
  body: T
}

export interface IApiResponseFail {
  status: Exclude<HTTPStatusCodes, HTTPStatusCodes.OK>
}

export type ApiResponse <T = any> = IApiResponseFail | IApiResponseSuccess<T>

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
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    // },
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
