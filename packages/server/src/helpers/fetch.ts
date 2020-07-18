import fetch, { RequestInit } from 'node-fetch'

export async function fetchPublicJson (api: S, body?: S) {
  const init: RequestInit = {
    method: 'GET',
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
  if (body) {
    init.body = body
  }

  const r = await fetch(api, init)

  return r.json()
}
