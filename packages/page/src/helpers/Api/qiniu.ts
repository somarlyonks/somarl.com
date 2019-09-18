import store, { ActionTypes } from '../../redux/store'
import { req } from '../fetch'


const localizeToken = (token: S) => {
  window.SS.qiniuToken = token
  return token
}

export async function getQiniuToken () {
  if (window.SS.qiniuToken) return window.SS.qiniuToken

  const state = store.getState()
  if (state && state.global.qiniuToken) return localizeToken(state.global.qiniuToken)

  const r = await req.POST('qiniu/token')
  const { token } = r.body
  store.dispatch({
    type: ActionTypes.global.SET_QINIU_TOKEN,
    payload: token,
  })
  return localizeToken(token)
}
