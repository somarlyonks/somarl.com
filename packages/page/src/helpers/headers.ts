
import { LS } from 'src/redux/helpers'

export const authHeader = (token?: S) => {
  token = token || (LS.GET('user') || {}).token

  if (token) return { Authorization: `Bearer ${token}` }
  return {}
}

export const HEADERS = {
  auth: authHeader,
}
