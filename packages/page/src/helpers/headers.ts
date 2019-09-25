export const authHeader = (token?: S) => {
  token = token || JSON.parse(localStorage.getItem('user') || '{}').token

  if (token) return { Authorization: `Bearer ${token}` }
  return {}
}

export const HEADERS = {
  auth: authHeader,
}
