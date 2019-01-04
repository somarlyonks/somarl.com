const API_SERVER = process.env.REACT_APP_API_SERVER

export async function fetchServerJson (endpoint: string, body?: S) {
  const api = API_SERVER + '/' + endpoint
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
