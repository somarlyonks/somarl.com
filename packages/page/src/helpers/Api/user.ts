import store, { ActionTypes } from '../../redux/store'
import { LS } from '../../redux/helpers'
import { req, isResponseOK } from '../fetch'
import { IUser } from '../Adapter'


function localize (user: IUser, token: S): IUser {
  const u = { ...user, token }
  LS.SET('user', u)
  store.dispatch({
    type: ActionTypes.user.LOGIN,
    payload: u,
  })
  return u
}

function boot () {
  return LS.GET<IUser>('user')
}

interface ILoginResp {
  user: IUser
  token: S
}


export async function login (username?: S, token?: S) {
  const loggedUser = await logged()
  if (loggedUser) return loggedUser

  if (!username || !token) throw new Error('Login without token!')

  const r2 = await req.POST<ILoginResp>('auth/login', {
    json: { username, token },
  })

  if (!isResponseOK(r2)) throw new Error(r2.body && r2.body.error)
  return localize(r2.body.user, r2.body.token)
}


export async function logged () {
  const user = boot()
  if (!user || !user.token) return false

  const r = await req.POST<ILoginResp>('auth/logged')
  if (isResponseOK(r)) return localize(r.body.user, r.body.token)

  return false
}


export async function logout () {
  const user = boot()
  if (!user || !user.token) return
  const r = await req.POST('auth/logout')
  if (!isResponseOK(r)) throw new Error(r.body && r.body.error)
  return
}
