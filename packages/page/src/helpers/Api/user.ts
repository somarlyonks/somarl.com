import store, { ActionTypes } from '../../redux/store'
import { req, isResponseOK } from '../fetch'
import { IUser } from '../Adapter'


function localize (user: IUser, token: S): IUser {
  const u = { ...user, token }
  localStorage.setItem('user', JSON.stringify(u))
  store.dispatch({
    type: ActionTypes.user.LOGIN,
    payload: u,
  })
  return u
}

function boot (): IUser | {token: undefined} {
  return JSON.parse(localStorage.getItem('user') || '{}')
}


export async function login (username?: S, token?: S) {
  const logged = boot()
  if (logged && logged.token) {
    const r = await req.POST('auth/logged')
    if (isResponseOK(r)) return localize(logged, logged.token)
  }

  if (!username || !token) throw new Error('Login without token!')

  const r2 = await req.POST<{user: IUser, token: S}>('auth/login', {
    json: { username, token },
  })

  if (!isResponseOK(r2)) throw new Error(r2.body && r2.body.error)
  return localize(r2.body.user, r2.body.token)
}


export async function logout () {
  const logged = boot()
  if (!logged || !logged.token) return
  const r = await req.POST('auth/logout')
  if (!isResponseOK(r)) throw new Error(r.body && r.body.error)
  return
}
