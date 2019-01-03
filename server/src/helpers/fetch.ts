import fetch, {RequestInit} from 'node-fetch'

export async function fetchPublicJson (api: string, body?: string) {
  const init: RequestInit = {
    method: 'GET',
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }
  if (body) {
    init.body = body
  }

  return fetch(api, init)
}
