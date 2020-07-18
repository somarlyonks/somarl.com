
import { h } from 'preact' // lgtm [js/unused-local-variable]

import { useRedux, actors, actor } from 'src/redux'

import WeatherWidget from 'src/components/weather'
import { Avatar, Dialog, LoginForm } from 'src/components/sui'


export default function Header () {
  const { user, logged, loginVisible } = useRedux(state => ({
    logged: state.user.isLoggedIn,
    user: state.user.user,
    loginVisible: state.user.loginVisible,
  }))

  const showLogin = () => actors.user.SHOWLOGIN(undefined)
  const hideLogin = () => actor({ type: actor.types.user.HIDELOGIN, payload: undefined })

  const onLogin: h.JSX.GenericEventHandler<HTMLFormElement> = event => {
    const target = event.currentTarget
    const formdata = new FormData(target)
    const data = Object.fromEntries(formdata.entries())
    console.info('data', data)
    // TODO: @sy login/register logic
    setTimeout(hideLogin)
  }

  return (
    <header class="nav absolute--tl flex">
      <WeatherWidget />
      <div class="flex-grow" />
      {logged
        ? <Avatar class="mg--5" user={user} />
        : <Avatar class="mg--5" user={user} onClick={showLogin} />
      }
      <Dialog visible={loginVisible} title="Register/Login" onCancel={hideLogin} form="login-form">
        <LoginForm id="login-form" onSubmit={onLogin} />
      </Dialog>
    </header>
  )
}
