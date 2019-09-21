import store, { ActionTypes } from '../../redux/store'
import { req, isResponseOK } from '../fetch'


const localizeToken = (token: S) => {
  window.SS.qiniuToken = token
  return token
}

const localizeSyncToken = (token: S) => {
  window.SS.qiniuSyncToken = token
  return token
}

export async function getQiniuToken () {
  if (window.SS.qiniuToken) return window.SS.qiniuToken

  const state = store.getState()
  if (state && state.qiniu.token) return localizeToken(state.qiniu.token)

  const r = await req.POST<{token: S}>('qiniu/token')

  if (!isResponseOK(r)) throw new Error('failed to fetch qiniu token')

  const { token } = r.body
  store.dispatch({
    type: ActionTypes.qiniu.SET_QINIU_TOKEN,
    payload: token,
  })
  return localizeToken(token)
}


export async function getQiniuSyncToken () {
  if (window.SS.qiniuSyncToken) return window.SS.qiniuSyncToken

  const state = store.getState()
  if (state && state.qiniu.syncToken) return localizeToken(state.qiniu.syncToken)

  const r = await req.POST<{token: S}>('qiniu/token', {
    json: { sync: true },
  })

  if (!isResponseOK(r)) throw new Error('failed to fetch qiniu token')

  const { token } = r.body
  store.dispatch({
    type: ActionTypes.qiniu.SET_QINIU_SYNC_TOKEN,
    payload: token,
  })
  return localizeSyncToken(token)
}
