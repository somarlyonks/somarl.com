// const API_SERVER = 'https://api.somarl.com'

export function fetchServer <T = any> (endpoint: string, params: T) {
  // const url = API_SERVER + endpoint
  // return fetch(endpoint, {})
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

  return fetch(api, init)
}
